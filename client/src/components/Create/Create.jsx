import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postToDb, getGenres, clearGames } from "../../Actions";
import styles from "./Create.module.css";
import { DisplayCreators } from "../DisplayCreators/DisplayCreators";
import { TabTitle } from "../GeneralFunctions";

export default function Create() {
  TabTitle("Create");

  const urlRegEx = useMemo(() => new RegExp("https?://.*.(?:png|jpg)"), []);

  const dateRegEx = useMemo(
    () =>
      new RegExp(/(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])/),
    []
  );

  const ratingRegEx = useMemo(
    () => new RegExp(/([0-4][.]\d\d)|([5][.][0][0])/),
    []
  );

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);
  if (allGenres.length === 0) {
    dispatch(getGenres());
  }

  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    rating: "",
    background_image: "",
    released: "",
  });

  const [platform, setPlatform] = useState([]);
  const [screenshot, setScreenshot] = useState([]);

  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [short_screenshots, setShort_Screenshots] = useState([]);

  const [validate, setValidate] = useState({
    n: false,
    d: false,
    rat: false,
    b: false,
    rel: false,
    p: false,
    g: false,
  });

  function handleStateChange(e, setState) {
    e.preventDefault();
    setState(e.target.value);
  }

  function handleAddState(e, element, setElement, state, setState) {
    e.preventDefault();
    if (!state.includes(element)) {
      setState([...state, element]);
      setElement("");
    }
  }

  function handleAddGenre(e) {
    e.preventDefault();
    if (!genres.includes(e.target.value)) {
      setGenres([...genres, e.target.value]);
    }
  }

  function handleAlert(e) {
    e.preventDefault();
    setShowAlert(false);
  }

  function handleSuccess(e) {
    e.preventDefault();
    setShowSuccess(false);
  }

  useEffect(() => {
    setValidate({
      n: newGame.name ? true : false,
      d: newGame.description ? true : false,
      rat: ratingRegEx.test(newGame.rating),
      b: urlRegEx.test(newGame.background_image),
      rel: dateRegEx.test(newGame.released),
      p: platforms.length ? true : false,
      g: genres.length ? true : false,
    });
  }, [newGame, genres, platforms, urlRegEx, dateRegEx, ratingRegEx]);

  function handleOnChange(e) {
    e.preventDefault();
    setNewGame((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { n, d, rat, b, rel, p, g } = validate;
    if (n && d && rat && b && rel && p && g) {
      setNewGame((newGame.rating = parseFloat(newGame.rating)));
      console.log(genres);
      dispatch(
        postToDb({
          ...newGame,
          platforms,
          genres,
          short_screenshots,
        })
      );
      dispatch(clearGames());

      setNewGame({
        name: "",
        description: "",
        rating: "",
        background_image: "",
        released: "",
      });
      setPlatforms([]);
      setGenres([]);
      setShort_Screenshots([]);

      setShowSuccess(true);
    } else {
      setShowAlert(true);
    }
  }

  return (
    <div className={styles.global}>
      <div className={styles.form_container}>
        <h1 className={styles.title}>CREATE VIDEOGAME</h1>
        <div className={styles.name}>
          <input
            className={styles.input}
            placeholder="Insert name..."
            name={"name"}
            value={newGame.name}
            onChange={(e) => handleOnChange(e)}
            autoComplete="off"
            required="required"
          ></input>
          <span className={validate.n ? styles.validInput : undefined}>
            {validate.n ? <i className="bx bx-check"></i> : ""}
          </span>
        </div>
        <div className={styles.description}>
          <input
            className={styles.input}
            placeholder="Insert description..."
            name={"description"}
            value={newGame.description}
            onChange={(e) => handleOnChange(e)}
            autoComplete="off"
            minLength={"20"}
            required="required"
          ></input>
          <span className={validate.d ? styles.validInput : undefined}>
            {validate.d ? <i className="bx bx-check"></i> : ""}
          </span>
        </div>
        <div className={styles.released}>
          <input
            className={styles.input}
            placeholder="Date YYYY-MM-DD"
            name={"released"}
            value={newGame.released}
            onChange={(e) => handleOnChange(e)}
            autoComplete="off"
            required="required"
          ></input>
          <span className={validate.rel ? styles.validInput : undefined}>
            {validate.rel ? <i className="bx bx-check"></i> : ""}
          </span>
        </div>
        <div className={styles.rating}>
          <input
            className={styles.input}
            placeholder="Rating: 0.00 to 5.00"
            name={"rating"}
            value={newGame.rating}
            onChange={(e) => handleOnChange(e)}
            autoComplete="off"
            required="required"
          ></input>
          <span className={validate.rat ? styles.validInput : undefined}>
            {validate.rat ? <i className="bx bx-check"></i> : ""}
          </span>
        </div>
        <div className={styles.background_image}>
          <input
            className={styles.input}
            placeholder="Poster: https://image.jpg"
            name={"background_image"}
            value={newGame.background_image}
            onChange={(e) => handleOnChange(e)}
            autoComplete="off"
            required="required"
          ></input>
          <span className={validate.b ? styles.validInput : undefined}>
            {validate.b ? <i className="bx bx-check"></i> : ``}
          </span>
        </div>
        <div className={styles.screenshots}>
          <form>
            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder="Screenshots: https://image.jpg"
                name={"add_screenshots"}
                value={screenshot}
                onChange={(e) => handleStateChange(e, setScreenshot)}
                autoComplete="off"
                required="required"
              ></input>
              <button
                disabled={!urlRegEx.test(screenshot)}
                className={styles.button_select}
                onClick={(e) =>
                  handleAddState(
                    e,
                    screenshot,
                    setScreenshot,
                    short_screenshots,
                    setShort_Screenshots
                  )
                }
              >
                <i className="bx bxs-send"></i>
              </button>
              <span
                className={
                  urlRegEx.test(screenshot) ? styles.validInput : undefined
                }
              >
                {urlRegEx.test(screenshot) ? (
                  <i className="bx bx-check"></i>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className={styles.displayCreators}>
              <DisplayCreators
                state={short_screenshots}
                setState={setShort_Screenshots}
              />
            </div>
          </form>
        </div>

        <div className={styles.dropdown}>
          <form>
            <div className={styles.field}>
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdown_button}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Genres...
                </button>
                <div className={styles.dropdown_content}>
                  {allGenres.map(({ name }) => {
                    return (
                      <button
                        key={name}
                        value={name}
                        onClick={(e) => handleAddGenre(e)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <span className={validate.g ? styles.validInput : undefined}>
                {validate.g ? <i className="bx bx-check"></i> : ""}
              </span>
            </div>
            <div className={styles.displayCreators}>
              {genres.map((g) => {
                return (
                  <button
                    key={g}
                    className={styles.button_select}
                    onClick={() =>
                      setGenres(genres.filter((genre) => genre !== g))
                    }
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </form>
        </div>
        <div className={styles.platform}>
          <form>
            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder="Platforms..."
                name={"platform"}
                value={platform}
                onChange={(e) => handleStateChange(e, setPlatform)}
                autoComplete="off"
                required="required"
              ></input>
              <button
                className={styles.button_select}
                onClick={(e) =>
                  handleAddState(
                    e,
                    platform,
                    setPlatform,
                    platforms,
                    setPlatforms
                  )
                }
              >
                <i className="bx bxs-send"></i>
              </button>
              <span className={validate.p ? styles.validInput : undefined}>
                {validate.p ? <i className="bx bx-check"></i> : ""}
              </span>
            </div>
            <div className={styles.displayCreators}>
              <DisplayCreators state={platforms} setState={setPlatforms} />
            </div>
          </form>
        </div>
        <div className={styles.submit}>
          {showSuccess && (
            <div className={styles.alert}>
              <button
                className={styles.button_alert2}
                onClick={(e) => handleSuccess(e)}
              >
                Videogame created successfully!
              </button>
            </div>
          )}
          {showAlert && (
            <div className={styles.alert}>
              <button
                className={styles.button_alert}
                onClick={(e) => handleAlert(e)}
              >
                ¡Missing data!
              </button>
            </div>
          )}
          <button className={styles.button} onClick={(e) => handleSubmit(e)}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
