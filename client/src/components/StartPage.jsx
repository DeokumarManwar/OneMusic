import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCardMain from "./SongCardMain";
import { motion } from "framer-motion";

const StartPage = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ user, allSongs, allArtists, allAlbums }, dispatch] = useStateValue();

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

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col ">
      {/*Main Container Song */}
      {user && user.user.playlist.length === 0 && (
        <div className="relative w-full my-4 p-4 gap-4 pt-32 pb-14  border-4 border-gray-900 shadow-lg bg-gray-100 rounded-md ">
          <div>
            <div className="absolute top-4 left-6 flex items-center gap-4">
              <img
                alt=""
                src={user?.user.imageURL}
                className="w-20 h-20 rounded-full object-cover border border-black"
              />
              <p className="text-lg text-center font-bold my-2 text-textColor">
                Songs You would Like...
              </p>
            </div>
          </div>

          <SongContainerMain data={allSongs} />
        </div>
      )}
      {user && user.user.playlist.length > 0 && (
        <div className="relative w-full my-4 p-4 gap-4 pt-32 pb-14  border-4 border-gray-900 shadow-lg bg-gray-100 rounded-md ">
          <div>
            <div className="absolute top-4 left-6 flex items-center gap-4">
              <img
                alt=""
                src={user?.user.imageURL}
                className="w-20 h-20 rounded-full object-cover border border-black"
              />
              <p className="text-lg text-center font-bold my-2 text-textColor">
                My Playlist
              </p>
            </div>
          </div>

          <SongContainerMain data={user.user.playlist} type="playlist" />
        </div>
      )}
      {/*Main Container Artist */}
      {allArtists &&
        allSongs &&
        allArtists.map((data, index) => {
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
      {allAlbums &&
        allSongs &&
        allAlbums.map((data, index) => {
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
    </div>
  );
};

export const SongContainerMain = ({ data ,type}) => {
  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-evenly">
      {data &&
        data.map((song, i) => {
          if (song)
            return <SongCardMain key={song?._id} data={song} index={i} type={type} />;
          return null;
        })}
    </div>
  );
};

export default StartPage;
