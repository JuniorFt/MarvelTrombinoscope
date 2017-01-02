export const REQUEST_HEROES_DATA = 'REQUEST_HEROES_DATA';
export const RECEIVE_HEROES_DATA = 'RECEIVE_HEROES_DATA';
export const SELECT_HERO = 'SELECT_HERO';
export const GET_LIST_FOR_ONE = 'GET_LIST_FOR_ONE';

export function isRequesting() {
  return {
    type: REQUEST_HEROES_DATA
  };
}

export function selectHero(listHero, heroName) {
  for (var cpt = 0; cpt < listHero.length ; cpt++) {
    if (listHero[cpt].name === heroName) {
      var hero = listHero[cpt];
      break;
    }
  };
  return (
    {
      type: SELECT_HERO,
      hero
    }
  );
}

export function getHeroesList(timestamp, hash) {
  return fetch('http://gateway.marvel.com:80/v1/public/characters?ts=' + timestamp.toString() + '&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=' + hash)
      .then(response => response.json())
      .then(json => {
        console.log("Get Json from API");
        return (
          {
            type: RECEIVE_HEROES_DATA,
            heroes: json.data.results,
          }
        );
      });
}

export function getHero(timestamp, hash, heroName) {
  return fetch('http://gateway.marvel.com:80/v1/public/characters?ts=' + timestamp.toString() + '&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=' + hash)
      .then(response => response.json())
      .then(json => {
        console.log("Get Json from API name = ");
        for (var cpt = 0; cpt < json.data.results.length ; cpt++) {
          if (json.data.results[cpt].name === heroName) {
            var hero = json.data.results[cpt];
            break;
          }
        };
        return (
          {
            type: GET_LIST_FOR_ONE,
            heroes: json.data.results,
            hero
          }
        );
      });
}