import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { BiSearchAlt } from "react-icons/bi";
import SongCard from "./SongCard";
import { SongContainerMai } from "./SearchPage";
import SongCardMain from "./SongCardMain";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [song, setSong] = useState([]);

  const [{ allSongs }, dispatch] = useStateValue();

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

  const SearchSong = (event) => {
    event.preventDefault();
    allSongs.map((data, i) => {
      console.log(songFilter, data.name);
      if (
        songFilter.toLowerCase() ===
        data.name.toLowerCase().substring(0, songFilter.length)
      ) {
        console.log(songFilter, data.name);
        data.index = i;

        setSong((song) => [...song, data]);
      }
      return null;
    });
  };

  return (
    <form
      className="w-full p-4 flex items-center justify-center flex-col "
      onSubmit={SearchSong}
    >
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashboard/newSong"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-white hover:border-black hover:shadow-md cursor-pointer"
        >
          <IoAdd className="text-white hover:text-black" />
        </NavLink>
        {songFilter && (
          <i onClick={() => setSongFilter("")}>
            <AiOutlineClear className="text-3xl text-white hover:text-black cursor-pointer" />
          </i>
        )}
        <input
          type="text"
          className={`w-300 px-4 py-2 border-2 ${
            isFocus ? "border-gray-500 shadow-md" : "border-black"
          } rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          placeholder="Search Here..."
          value={songFilter}
          onChange={(e) => {
            setSongFilter(e.target.value);
            setSong([]);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
        />
        <i onClick={SearchSong}>
          <BiSearchAlt className="text-3xl text-white hover:text-black cursor-pointer" />
        </i>
      </div>
      {!songFilter && (
        <div className="relative w-full my-4 p-4 py-16 border-4 border-gray-900 bg-gray-100 rounded-md">
          <SongContainer data={allSongs} />
        </div>
      )}
      {songFilter && (
        <div className="relative w-full my-4 p-4 py-16 border-4 border-gray-900 bg-gray-100 rounded-md">
          {console.log(song)}
          <SongContainerMain1 data={song} />
        </div>
      )}
    </form>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly ">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};

export const SongContainerMain1 = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly ">
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

export default DashboardSongs;
