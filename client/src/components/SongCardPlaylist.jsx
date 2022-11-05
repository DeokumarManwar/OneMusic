import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { changingUserPlaylist, getAllSongs } from "../api";

const SongCardMain = ({ data, index, type }) => {
  // console.log(type);

  const [{ user }, dispatch] = useStateValue();
  const [isUserPlaylistUpdated, setIsUserPlaylistUpdated] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [song, setSong] = useState(false);

  if (!firstTime && user) {
    setFirstTime(true);
    user.user.playlist.map((songs, i) => {
      console.log(data.name, songs.name);
      if (data.name.toLowerCase() === songs.name.toLowerCase()) {
        console.log(data.name, songs.name);
        songs.index = i;
        setSong(true);
      }
      return null;
    });
  }

  const updateUserPlaylist = (userId, song) => {
    console.log(user.user, [...user.user.playlist, song]);
    setIsUserPlaylistUpdated(false);
    setSong(true);
    changingUserPlaylist(userId, [...user.user.playlist, song]).then((res) => {
      if (res) {
        dispatch({
          type: actionType.SET_USER,
          user: res.data,
        });
      }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-40 min-w-210 px-2 py-4  cursor-pointer bg-white hover:bg-blue-100  shadow-md rounded-lg flex flex-col items-center border border-black hover:shadow-2xl"
    >
      <div className="2-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data?.name.length > 20 ? `${data?.name.slice(0, 20)}..` : data?.name}
        {data?.artist && (
          <span className=" text-sm text-center text-gray-400 flex items-center justify-between my-1">
            {data?.artist.length > 10
              ? `${data?.artist.slice(0, 10)}..`
              : data?.artist}
          </span>
        )}
      </p>
      {firstTime && !song && (
        <div className="w-full absolute bottom-2 left-40 flex items-center justify-between px-4">
          <motion.i
            whileTap={{ scale: 0.75 }}
            className="text-base text-blue-400 drop-shadow-md hover:text-blue-600"
            onClick={() => {
              setIsUserPlaylistUpdated(true);
              updateUserPlaylist(user.user._id, data);
            }}
          >
            <MdPlaylistAdd className="h-7 w-7" />
          </motion.i>
        </div>
      )}
      {firstTime && song && (
        <div className="w-full absolute bottom-2 left-40 flex items-center justify-between px-4">
          <motion.i
            whileTap={{ scale: 0.75 }}
            className="text-base text-green-400 drop-shadow-md hover:text-green-600"
          >
            <MdPlaylistAddCheck className="h-7 w-7" />
          </motion.i>
        </div>
      )}
    </motion.div>
  );
};

export default SongCardMain;
