export function formantCurrency(amount:number){
    return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(amount)
}

export function formatDate(dateString:string ):string {
    const dateObje=new Date(dateString)

    const options:Intl.DateTimeFormatOptions={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    }

    return new Intl.DateTimeFormat('es-ES',options).format(dateObje)
}