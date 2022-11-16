import React from "react"
import * as XLSX from "xlsx"
import { Path } from "phosphor-react"
export default class DataInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleFile(file) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target?.result
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      console.log(rABS, wb)
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) })
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }
  handleChange(e) {
    const files = e.target.files
    if (files && files[0]) this.props.handleFile(files[0])
  }
  render() {
    return (
      <form className="form-inline">
        <div className="flex justify-center items-center">
        <label
          htmlFor="inputFile"
          className=" bg-red-500 hover:bg-red-700 rounded text-zinc-100 font-bold flex m-4 p-1"
        >
          <Path size={24} />
          Carregar Rota
        </label>
        <input
          id="inputFile"
          type="file"
          className="hidden"
          accept={
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }
          onChange={this.handleChange}
        />
      </div>
        {/* <div className="form-group">
          <label htmlFor="file">Spreadsheet</label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
            onChange={this.handleChange}
          />
        </div> */}
      </form>
    )
  }
}

const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o
}
