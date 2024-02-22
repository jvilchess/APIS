const input = document.querySelector("input");
const monedaSelected = document.getElementById("moneda")
const btn = document.querySelector("button");
const span = document.querySelector("span");

let miGrafico = null

const getMonedas = async () => {
    try {
        const response = await fetch(`https://mindicador.cl/api/${monedaSelected.value}`);
        const monedas = await response.json()
        return monedas
    } catch (error) {
        alert('Ups tenemos un problema, intenta mas tarde')
    }
}

const calculo = async () => {
    const monedas = await getMonedas()
    const calcular = parseInt(input.value) / monedas.serie[0].valor
    span.innerHTML = `${calcular.toFixed(2)} ${monedaSelected.value}`
}

  const configuraciongrafico = (monedas) => {
    const config = {
      type: 'line',
      data: {
        labels: monedas.serie.slice(0, 10).map((moneda) => {
          return new Date(moneda.fecha).toLocaleDateString('en-Gb')
        }),
          datasets: [{
            label: 'Historial últimos 10 días',
            backgroundColor: 'black',
            data: monedas.serie.slice(0, 10).map((moneda) => {
              return moneda.valor
            })
          }]
        }
      }
      return config
    }

  const grafico = async () => {
    const monedas = await getMonedas()
    const config = configuraciongrafico(monedas)
    const myChart = document.getElementById('grafico')
    document.getElementById('graficcontainer').style.backgroundColor="white"
    miGrafico = new Chart(myChart, config)
  }

  const destruirGrafico = () => {
    if(miGrafico != null){
      document.getElementById('graficcontainer').style.backgroundColor=""
      miGrafico.destroy()
    }
  }

  const main = async () => {
    calculo()
    grafico()
    destruirGrafico()
}

  btn.addEventListener("click", () => {
    if (isNaN(parseInt(input.value)))
    {
      destruirGrafico()
      alert("Valor ingresado no válido, intente nuevamente utilizando datos numéricos")
    }
    else
    {
      main();
    }
      
    })




