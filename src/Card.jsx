const Card = ({
  id,
  ip,
  country,
  countryCode,
  timeZone,
  deleteCard,
  updateIp,
  showCountry,
}) => {
  const flagUrl = countryCode
    ? `https://flagsapi.com/${countryCode}/flat/64.png`
    : null;

  return (
    <div className="card">
      <img
        src="x.svg"
        alt="delete-icon"
        className="card-delete"
        onClick={() => deleteCard(id)}
      />
      {showCountry ? (
        <div className="country-info-wrapper">
          {country ? (
            <>
              <div className="country-main-info">
                {flagUrl && (
                  <img src={flagUrl} alt="flag" className="flag-img" />
                )}
                <p>{country}</p>
              </div>
              <div className="country-secondary-info">
                <img src="clock.svg" alt="timezone" />
                <p>{timeZone}</p>
              </div>
            </>
          ) : (
            <>
              <div className="invalid-ip">
                <h3>Nothing to show</h3>
                <p>Either no ip was provided or something went wrong</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <p>IP address</p>
          <input
            type="text"
            className="ip-input"
            value={ip}
            onChange={(e) => updateIp(id, e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default Card;
