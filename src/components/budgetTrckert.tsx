import AmountDisplay from "./amountDisplay"
export default function BudgetTraker(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex justify-center">
            <img src="public/grafico.jpg" alt="Grafica de gastos" />
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <button type="button" className="bg-pink-600 p-2 w-full text-white uppercase font-bold rounded-lg">
              Resetear app
            </button>
            <AmountDisplay label="Presupuesto" amount={300} />
            <AmountDisplay label="Disponible" amount={200}/>
            <AmountDisplay label="Gastado" amount={100} />
          </div>
        </div>
    )

}