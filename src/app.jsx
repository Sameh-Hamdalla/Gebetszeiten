import { useEffect, useState } from "react"
import Prayer from "./componant/Prayer"


 function App() {

  const[prayerTimes, setPrayerTimes]= useState()
  const[dateTime, setDateTime]= useState("")
  const[city, setCity]= useState("Cairo")

/**
 * * Das Array `cities` enthält mehrere Objekte, die jeweils einen Stadtnamen (`name`) 
 * und einen zugehörigen Wert (`value`) enthalten.
 * Dieses Array wird mit der Methode `map()` durchlaufen.
 * Für jedes Objekt wird ein <option>-Element erzeugt, das im Dropdown-Menü erscheint.
 * 
 * - `key={city_obj.value}`: Ein eindeutiger Schlüssel für React
 * - `value={city_obj.value}`: Der Wert, der übermittelt wird, wenn die Option gewählt wird
 * - `{city_obj.name}`: Der angezeigte Text im Dropdown
 
 *  */
  const cities =[
    {name: "Kairo", value: "Cairo" },
    {name: "Alexandria", value: "Alexandria" },
    {name: "Qena", value: "Qena" },
    {name: "Hurghada", value: "Hurghada" },
    {name: "Aswan", value: "Aswan" },
    {name: "Luxor", value: "Luxor" }
  ]

  console.log(city);
  
  
  // Führt den Code bei jedem Render aus

  /**
 * useEffect wird verwendet, um nach dem ersten Rendern der Komponente 
 * automatisch eine Funktion auszuführen.
 * 
 * In diesem Fall:
 * - Definieren wir eine asynchrone Funktion fetchPrayerTimes.
 * - Diese Funktion ruft per fetch die Gebetszeiten von einer API ab.
 * - Die Antwort wird mit response.json() in ein JavaScript-Objekt umgewandelt.
 * - Falls ein Fehler auftritt (z. B. Netzwerkfehler), wird dieser in der Konsole angezeigt.
 * 
 * Die leere Abhängigkeitsliste [] bedeutet:
 * → Der Effekt wird nur einmal beim Laden der Komponente ausgeführt.
 */

useEffect(() => {
  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`
        )
      const data_Prayer = await response.json()

      setPrayerTimes(data_Prayer.data.timings)
      setDateTime(data_Prayer.data.date.gregorian.date)

    } catch (error) {
      console.error(error)
      const today = new Date().toLocaleDateString('de-DE')
      setDateTime(today)
    }
  }
  fetchPrayerTimes()
}, [city])

// const formatTimes = (time)=>{
//   if (!time) {
//     return "00:00 Uhr"
//   }
//   let [hours, minutes] = time.split(":").map(Number)
//   const perd = hours >=12? "PM" : "AM";
//   hours = hours % 12 || 12;
//   return `${hours}: ${minutes} ${perd}`
// }


  return (
    <section>
      <div className="container">
          <div className="top_sec">
            <div className="city">
              <h3>Stadt</h3>
              <select name="" id="" onChange={(e) => setCity(e.target.value)}>
                {cities.map((city_obj)=>(
                  <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
                ))}
              </select>
            </div>
            <div className="date">
                <h3>Datum</h3>
                <h4>{dateTime}</h4>


            </div>
          </div>
            <Prayer name="Fajr" time={prayerTimes?.Fajr}/>
            <Prayer name="Dhuhr" time={prayerTimes?.Dhuhr}/>
            <Prayer name="Asr" time={prayerTimes?.Asr} />
            <Prayer name="Maghrib" time={prayerTimes?.Maghrib}/>
            <Prayer name="Isha" time={prayerTimes?.Isha}/>


      </div>
    </section>
  )
}
export default App