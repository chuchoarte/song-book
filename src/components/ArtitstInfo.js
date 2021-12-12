import React from 'react';

export const ArtitstInfo = ({info,errorInfo}) => {

    const { strArtistThumb, strGenre, strBiographyEN } = info;
    return (
        <>
            {
                errorInfo ? 'No found.' : null
            }

            {
                Object.keys(info).length === 0 ? null : <div className="card border-light animate__animated animate__fadeIn">
                    <div className="card-header bg-primary font-weight-bold">
                        Artist Info
                    </div>
                    <div className="card-body">
                        <img src={strArtistThumb} alt="Artist Logo" className={"animate__animated animate__fadeIn"}/>
                        <p className="card-text">Gender: {strGenre}</p>
                        <h2 className="card-text">Biography:</h2>
                        <p className="card-text">{strBiographyEN}</p>
                        <p className="card-text">
                            <a href={`https://${info.strFacebook}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href={`https://${info.strTwitter}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href={`${info.strLastFMChart}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-lastfm"></i>
                            </a>
                        </p>
                    </div>
                </div>
            }
        </>
    );
};