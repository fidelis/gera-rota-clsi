import React from "react";

var inputClass = "shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-4 my-2"
var labelClass = "block text-gray-700 text-sm font-bold m-2 mx-4 my-2"

export default class RouteForm extends React.Component {

 render () {
  return (
  <div className="flex justify-center">
   <form className="bg-zinc-100 shadow-md rounded px-8 pt-6 pb-8 mb-8 mt-4 grid md:grid-cols-2">
      <div>
        <label className= {labelClass}
              htmlFor="id_rota">
                Id da Rota</label>
        <input name="id_rota" 
              type="string" 
              value={this.props.idRota} 
              onChange={e => this.setState({idRota: e.target.value})} 
              placeholder="id da rota" 
              required 
              className={inputClass}/>
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_veiculo">
                Id do Veículo</label>
        <input name="id_veiculo" 
              type="string" 
              value={this.props.idVeiculo} 
              onChange={e => this.setState({idVeiculo: e.target.value})} 
              placeholder="id do veículo" 
              required 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_frota">
                Id da Frota</label>
        <input name="id_frota" 
              type="string" 
              value={this.props.idFrota} 
              onChange={e => this.setState({idFrota: e.target.value})} 
              placeholder="id da frota" 
              required 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_carga">
                Id da Carga</label>
        <input name="id_carga" 
              type="string" 
              value={this.props.idCarga} 
              onChange={e => this.setState({idCarga: e.target.value})} 
              placeholder="id da carga" 
              required 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_motorista">
                Motorista</label>
        <input name="id_motorista" 
              type="string" 
              value={this.props.idMotorista} 
              onChange={e => this.setState({idMotorista: e.target.value})} 
              placeholder="id do Motorista" 
              required 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_ajudante1">
                Ajudante1</label>
        <input name="id_ajudante1" 
              type="string" 
              value={this.props.idAjudante1} 
              onChange={e => this.setState({idajudante1: e.target.value})} 
              placeholder="id do Ajudante1" 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_ajudante2">
                Ajudante2</label>
        <input name="id_ajudante2" 
              type="string" 
              value={this.props.idAjudante1} 
              onChange={e => this.setState({idajudante1: e.target.value})} 
              placeholder="id do Ajudante2" 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="id_ajudante3">
                Ajudante3</label>
        <input name="id_ajudante3" 
              type="string" 
              value={this.props.idAjudante1} 
              onChange={e => this.setState({idajudante1: e.target.value})} 
              placeholder="id do Ajudante3" 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
              htmlFor="dthr_inicio">
                Data e Hora de Inicio</label>
        <input name="dthr_inicio" 
              type="datetime-local" 
              value={this.props.dtHrInicio} 
              onChange={e => this.setState({dtHrInicio: e.target.value})} 
              placeholder="data e hora de inicio" 
              required 
              className = {inputClass} />
      </div>
      <div>
        <label className = {labelClass} 
               htmlFor="dthr_fim">
                Data e Hora de Fim</label>
        <input name="dthr_fim" 
               type="datetime-local" 
               value={this.props.dtHrFim} 
               onChange={e => this.setState({dtHrFim: e.target.value})} 
               placeholder="data e hora de fim" 
               required 
               className = {inputClass}/>
      </div>
    </form>
  </div>
  )
 }
}
 function saveData(e) {
  console.log(e)
 };
