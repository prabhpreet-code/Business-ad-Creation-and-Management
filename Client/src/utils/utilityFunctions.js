export function fetchNamearray(array){
    let demoarray=[];
    array.map(country=>{
        demoarray.push(country.value)

    })
    return demoarray;

  }
