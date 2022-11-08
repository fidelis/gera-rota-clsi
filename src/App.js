import React from "react"
import { read, writeFile, utils } from "xlsx"
import DragDropFile from "./components/File/DragDropFile"
import DataInput from "./components/File/DataInput"
import OutTable from "./components/File/OutTalbe"


export default class SheetJSApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
    }
    this.handleFile = this.handleFile.bind(this)
    this.exportFile = this.exportFile.bind(this)
  }
  handleFile(file) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target?.result
      const wb = read(bstr, { type: rABS ? "binary" : "array" })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      console.log(rABS, wb)
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, { header: 1 })
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) })
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }
  exportFile() {
    /* convert state to workbook */
    const ws = utils.aoa_to_sheet(this.state.data)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "SheetJS")
    /* generate XLSX file and send to client */
    writeFile(wb, "sheetjs.xlsx")
  }

  render() {
    return (
    <div>
      <div className="flex flex-col items-center">
        <p className="m-10 text-white text-4xl font-serif">CLSI GERA ROTA</p>
      </div>
      <div className="flex justify-center items-center">
        <label
          htmlFor="inputFile"
          className="max-w-xs bg-violet-600 hover:bg-violet-900 rounded p-2 text-zinc-100 font-bold"
        >
          Carregar Rota
        </label>
        <input
          id="inputFile"
          type="file"
          className="hidden"
        />
      </div>
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={this.state.data} cols={this.state.cols} />
          </div>
        </div>
      </DragDropFile>
    </div>
    )
  }
}

const make_cols = (refstr) => {
  let o = [],
    C = utils.decode_range(refstr).e.c + 1
  for (var i = 0; i < C; ++i) o[i] = { name: utils.encode_col(i), key: i }
  return o
}