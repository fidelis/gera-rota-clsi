import React from "react"
import { read, writeFile, utils } from "xlsx"
import DragDropFile from "../components/File/DragDropFile"
import DataInput from "../components/File/DataInput"
// import OutTable from "../components/File/OutTalbe"
import RouteForm from "../components/routeForm/RouteForm"

export default class SheetJSApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
      idRota: String(),
      idVeiculo: String(),
      idFrota: String(),
      idMotorista: String(),
      idAjudante1: String(),
      idAjudante2: String(),
      idAjudante3: String(),
      idCarga: String(),
      dtHrInicio: String(),
      dtHrFim: String(),
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
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, { header: 1 })
      /* Update state */
      let idR = String()
      let idV = String()
      let idF = String()
      let idM = String()
      let idA1 = String()
      let idA2 = String()
      let idA3 = String()
      let idC = String()
      let dtHrI = data[1][16]
      let dtHrF = data[1][17]
      idR = data[1][0]
      idV = data[1][1]
      idF = data[1][2]
      idM = data[1][3]
      idA1 = data[1][4]
      idA2 = data[1][5]
      idA3 = data[1][6]
      idC = data[1][7]
      this.setState({ data: data, 
                      cols: make_cols(ws["!ref"]), 
                      idRota: idR, 
                      idVeiculo: idV,
                      idFrota: idF,
                      idMotorista: idM,
                      idAjudante1: idA1,
                      idAjudante2: idA2,
                      idAjudante3: idA3,
                      idCarga: idC,
                      dtHrInicio: dtHrI,
                      dtHrFim: dtHrF,
                     })
      console.log(dtHrF)
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
      <div>
        <div className="flex flex-col items-center">
          <p className="m-8 text-zinc-500 text-4xl font-alfa tracking-widest">CLSI  ROTA</p>
        </div>
      </div>
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
      </DragDropFile>
      <RouteForm idRota={this.state.idRota} 
                idVeiculo={this.state.idVeiculo} 
                idFrota={this.state.idFrota} 
                idMotorista={this.state.idMotorista}
                idAjudante1={this.state.idAjudante1}
                idAjudante2={this.state.idAjudante2}
                idAjudante3={this.state.idAjudante3}
                idCarga={this.state.idCarga}
                dtHrInicio={this.state.dtHrInicio}
                dtHrFim={this.state.dtHrFim}/>
      <div className="flex justify-center">
              <button className="bg-red-500 hover:bg-red-700 rounded p-2 text-zinc-100 font-bold"
                id="exportFile"
                type="file">                
              Mapa
              </button>
      </div>
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
