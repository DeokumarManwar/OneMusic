import React, { useState, useEffect } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { BiSearchAlt } from "react-icons/bi";
import SongCardMain from "./SongCardMain";
import { SongContainerMain } from "./StartPage";
import { motion } from "framer-motion";

const SearchPage = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [song, setSong] = useState([]);
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);

  const [{ allSongs, allArtists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        // console.log(data.songs);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }
  }, []);

  if (!allAlbums) {
    getAllAlbums().then((data) => {
      dispatch({
        type: actionType.SET_ALL_ALBUMS,
        allAlbums: data.album,
      });
    });
  }

  const SearchSong = (event) => {
    event.preventDefault();
    allSongs.map((data, i) => {
      console.log(songFilter, data.name);
      if (
        songFilter.toLowerCase() ===
        data.name.toLowerCase().substring(0, songFilter.length)
      ) {
        console.log(songFilter, data.name, song);
        data.index = i;
        setSong((song) => [...song, data]);
      }
      return null;
    });
    allArtists.map((data, i) => {
      if (
        songFilter.toLowerCase() ===
        data.name.toLowerCase().substring(0, songFilter.length)
      ) {
        setArtist((artist) => [...artist, data]);
      }
      return null;
    });
    allAlbums.map((data, i) => {
      if (
        songFilter.toLowerCase() ===
        data.name.toLowerCase().substring(0, songFilter.length)
      ) {
        setAlbum((album) => [...album, data]);
      }
      return null;
    });
  };

  return (
    <form
      className="w-full p-4 flex items-center justify-center flex-col"
      onSubmit={SearchSong}
    >
      <div className="w-full flex justify-center items-center gap-20 ">
        {songFilter && (
          <i onClick={() => setSongFilter("")}>
            <AiOutlineClear className="text-3xl text-white hover:text-black cursor-pointer" />
          </i>
        )}
        <input
          type="text"
          className={`w-300 px-4 py-2 border-2 ${
            isFocus ? "border-gray-500  shadow-lg" : "border-black"
          } rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          placeholder="Search Here..."
          value={songFilter}
          onChange={(e) => {
            setSongFilter(e.target.value);
            setSong([]);
            setAlbum([]);
            setArtist([]);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
        />
        <i onClick={SearchSong}>
          <BiSearchAlt className="text-3xl text-white hover:text-black  cursor-pointer" />
        </i>
      </div>
      {!songFilter && (
        <div className="relative w-full my-4 p-4 py-16 border-4 border-gray-900 rounded-md bg-gray-100 ">
          <SongContainerMain data={allSongs} />
        </div>
      )}
      {songFilter && song.length !== 0 && (
        <div className="relative w-full my-4 p-4 py-16 border-4 border-gray-900 rounded-md bg-gray-100">
          {console.log(song)}
          <SongContainerMai data={song} />
        </div>
      )}
      {artist &&
        allSongs &&
        artist.map((data, index) => {
          return (
            <div className="relative w-full my-4 p-4 pt-32 pb-14 border-4 border-gray-900 rounded-md shadow-lg bg-gray-100 flex flex-col items-center">
              <section className="absolute top-4 left-6 flex items-center gap-4">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={data.imageURL}
                  className="w-20 h-20 rounded-full object-cover border border-black"
                />

                <p className="text-lg text-center font-bold my-2 text-textColor">
                  {data.name}'s Songs
                </p>
              </section>

              <SongContainerMain
                data={allSongs.map((song) =>
                  data.name === song.artist ? song : null
                )}
              />
            </div>
          );
        })}
      {album &&
        allSongs &&
        album.map((data, index) => {
          return (
            <div className="relative w-full my-4 p-4 pt-32 pb-14 border-4 border-gray-900 shadow-2xl bg-gray-100 rounded-md gap-4">
              <div>
                <div className="absolute top-4 left-6 flex items-center gap-4">
                  <img
                    alt=""
                    src={data.imageURL}
                    className="w-20 h-20 rounded-full object-cover border border-black"
                  />
                  <p className="text-lg text-center font-bold my-2 text-textColor">
                    {data.name}'s Album
                  </p>
                </div>
              </div>

              <SongContainerMain
                data={allSongs.map((song) =>
                  data.name === song.album ? song : null
                )}
              />
            </div>
          );
        })}
    </form>
  );
};

export const SongContainerMai = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song) => {
          if (song)
            return (
              <SongCardMain key={song?._id} data={song} index={song.index} />
            );
          return null;
        })}
    </div>
  );
};

export default SearchPage;
