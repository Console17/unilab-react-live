import { useState } from "react";
import Btns from "./Btns";
import Card from "./Card";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [ipLocations, setIpLocations] = useState({});
  const [showCountry, setShowCountry] = useState(false);

  function addCard() {
    const newCard = { id: cards.length, ip: "" };
    setCards([...cards, newCard]);
    setShowCountry(false);
  }

  function clearCards() {
    setCards([]);
    setIpLocations({});
    setShowCountry(false);
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id));
  }

  function updateIp(id, newIp) {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, ip: newIp } : card))
    );
  }

  async function toggleCards() {
    const newIpLocations = {};

    await Promise.all(
      cards.map(async (card) => {
        if (card.ip) {
          try {
            const response = await fetch(`http://ip-api.com/json/${card.ip}`);
            const data = await response.json();
            newIpLocations[card.id] = {
              country: data.status === "success" ? data.country : "Invalid IP",
              countryCode: data.status === "success" ? data.countryCode : null,
              timeZone: data.status === "success" ? data.timezone : null,
            };
          } catch (error) {
            newIpLocations[card.id] = "Error fetching";
          }
        } else {
          newIpLocations[card.id] = "no ip entered";
        }
      })
    );

    setIpLocations(newIpLocations);
    setShowCountry(true);
  }

  return (
    <>
      <div className="container">
        <Btns
          addCard={addCard}
          clearCards={clearCards}
          toggleCards={toggleCards}
        />

        <div className="cards-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              ip={card.ip}
              country={ipLocations[card.id]?.country || null}
              countryCode={ipLocations[card.id]?.countryCode || null}
              timeZone={ipLocations[card.id]?.timeZone || null}
              deleteCard={deleteCard}
              updateIp={updateIp}
              showCountry={showCountry}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
