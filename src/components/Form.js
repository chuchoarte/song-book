import React, {useState} from 'react';
import {useForm} from "../hooks/useForm";
import {Alerts} from "../helpers/Alerts";

export const Form = ({setQuery}) => {
    const [error, setError] = useState(false);
    const [formValues, handleInputChange] = useForm({
        artist: '',
        song: ''
    });
    const {artist, song} = formValues;


    const handleSubmit = (e) => {
        e.preventDefault();
        if (artist.trim() === '' || song.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        setQuery(formValues);
    };
    return (
        <div className={"bg-info"}>
            <div className={"container"}>
                <div className={"row"}>

                    <form
                        onSubmit={handleSubmit}
                        className={"col card text-white bg-transparent mb-5 pt-5 pb-2"}
                    >
                        <fieldset>
                            {
                                error ?
                                    <Alerts type={"error"} msg={"All inputs are required."} />
                                    : null
                            }
                            <legend className={"text-center"}>
                                Song Letter Search Engine
                            </legend>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artist</label>
                                        <input
                                            type="text"
                                            className={"form-control"}
                                            name={`artist`}
                                            value={artist}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Song</label>
                                        <input
                                            type="text"
                                            className={"form-control"}
                                            name={`song`}
                                            value={song}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type={"submit"}
                                className={"btn btn-primary float-end mt-3"}
                            >
                                Search
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};