"use client";

import club1 from "@/assets/cvs-page/club1.png";
import flag1 from "@/assets/cvs-page/flag1.png";
import goldCard from "@/assets/cvs-page/gold-card.png";
import playerImage from "@/assets/cvs-page/id/player-short-image.png";
import pinkCard from "@/assets/cvs-page/pink-card.png";
import whiteCard from "@/assets/cvs-page/white-card.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Player {
  id: number;
  name: string;
  rating: number;
  position: string;
  country: string;
  image: string;
  stats: {
    pac: number;
    dri: number;
    sho: number;
    def: number;
    pas: number;
    phy: number;
  };
  cardType: "gold" | "white" | "pink";
}

const players: Player[] = [
  {
    id: 1,
    name: "PALMER",
    rating: 74,
    position: "ST",
    country: "🇪🇸",
    image: "https://images.pexels.com/photos/29661157/pexels-photo-29661157.jpeg",
    stats: { pac: 93, dri: 85, sho: 75, def: 78, pas: 78, phy: 82 },
    cardType: "pink",
  },
  {
    id: 2,
    name: "SILVA",
    rating: 82,
    position: "LM",
    country: "🇧🇷",
    image: "https://images.pexels.com/photos/32205625/pexels-photo-32205625.jpeg",
    stats: { pac: 88, dri: 90, sho: 79, def: 70, pas: 85, phy: 75 },
    cardType: "gold",
  },
  {
    id: 3,
    name: "WIRTZ",
    rating: 85,
    position: "CAM",
    country: "🇩🇪",
    image: "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
    stats: { pac: 82, dri: 91, sho: 84, def: 60, pas: 88, phy: 70 },
    cardType: "white",
  },
  {
    id: 4,
    name: "MBAPPE",
    rating: 91,
    position: "ST",
    country: "🇫🇷",
    image: "https://images.pexels.com/photos/29661157/pexels-photo-29661157.jpeg",
    stats: { pac: 97, dri: 92, sho: 89, def: 40, pas: 80, phy: 83 },
    cardType: "gold",
  },
  {
    id: 5,
    name: "DE BRUYNE",
    rating: 91,
    position: "CM",
    country: "🇧🇪",
    image: "https://images.pexels.com/photos/32205625/pexels-photo-32205625.jpeg",
    stats: { pac: 74, dri: 86, sho: 88, def: 65, pas: 93, phy: 78 },
    cardType: "white",
  },
  {
    id: 6,
    name: "HAALAND",
    rating: 90,
    position: "ST",
    country: "🇳🇴",
    image: "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
    stats: { pac: 89, dri: 80, sho: 94, def: 45, pas: 65, phy: 92 },
    cardType: "gold",
  },
  {
    id: 7,
    name: "PEDRI",
    rating: 86,
    position: "CM",
    country: "🇪🇸",
    image: "https://images.pexels.com/photos/29661157/pexels-photo-29661157.jpeg",
    stats: { pac: 80, dri: 92, sho: 75, def: 70, pas: 89, phy: 72 },
    cardType: "pink",
  },
  {
    id: 8,
    name: "VINICIUS",
    rating: 89,
    position: "LW",
    country: "🇧🇷",
    image: "https://images.pexels.com/photos/32205625/pexels-photo-32205625.jpeg",
    stats: { pac: 95, dri: 91, sho: 84, def: 45, pas: 80, phy: 75 },
    cardType: "gold",
  },
  {
    id: 9,
    name: "BELLINGHAM",
    rating: 88,
    position: "CM",
    country: "🇬🇧",
    image: "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
    stats: { pac: 83, dri: 87, sho: 86, def: 78, pas: 85, phy: 85 },
    cardType: "white",
  },
  {
    id: 10,
    name: "SALAH",
    rating: 90,
    position: "RW",
    country: "🇪🇬",
    image: "https://images.pexels.com/photos/29661157/pexels-photo-29661157.jpeg",
    stats: { pac: 93, dri: 89, sho: 88, def: 45, pas: 82, phy: 75 },
    cardType: "pink",
  },
  {
    id: 6,
    name: "HAALAND",
    rating: 90,
    position: "ST",
    country: "🇳🇴",
    image: "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
    stats: { pac: 89, dri: 80, sho: 94, def: 45, pas: 65, phy: 92 },
    cardType: "gold",
  },
  {
    id: 7,
    name: "PEDRI",
    rating: 86,
    position: "CM",
    country: "🇪🇸",
    image: "https://images.pexels.com/photos/29661157/pexels-photo-29661157.jpeg",
    stats: { pac: 80, dri: 92, sho: 75, def: 70, pas: 89, phy: 72 },
    cardType: "pink",
  },
  {
    id: 8,
    name: "VINICIUS",
    rating: 89,
    position: "LW",
    country: "🇧🇷",
    image: "https://images.pexels.com/photos/32205625/pexels-photo-32205625.jpeg",
    stats: { pac: 95, dri: 91, sho: 84, def: 45, pas: 80, phy: 75 },
    cardType: "gold",
  },
  {
    id: 9,
    name: "BELLINGHAM",
    rating: 88,
    position: "CM",
    country: "🇬🇧",
    image: "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
    stats: { pac: 83, dri: 87, sho: 86, def: 78, pas: 85, phy: 85 },
    cardType: "white",
  },
  {
    id: 10,
    name: "SALAH",
    rating: 90,
    position: "RW",
    country: "🇪🇬",
    image: "https://images.pexels.com/photos/29661157/pexels-photo-29661157.jpeg",
    stats: { pac: 93, dri: 89, sho: 88, def: 45, pas: 82, phy: 75 },
    cardType: "pink",
  },
];

export default function Players() {
  const router = useRouter();
  return (
    <div className="container mt=20 bg-black p-8">
      <h1
        className="text-4xl text-center font-heading mb-12"
        style={{ color: "#00FF62" }}
      >
        PLAYERS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {players.map((player) => (
          <div onClick={() => router.push("/cvs-page/player-cv-details")} key={player.id} className="flex justify-center">
            <div className="relative min-h-50 hover:scale-110 duration-300">
              <Image
                className=" h-full w-full z-10"
                src={
                  player.cardType === "pink"
                    ? pinkCard
                    : player.cardType === "gold"
                      ? goldCard
                      : whiteCard
                }
                alt="card background"
              />
              {/* top values */}
              <div className="absolute top-[15%] left-7 text-black">
                <h2 className="text-3xl font-semibold">74</h2>
                <h2 className="text-lg">LM</h2>
                <Image src={flag1} className="w-6 mt-2" alt="flag image"/>
                <Image src={club1} className="w-6 mt-2" alt="club image image"/>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className=" relative w-[90%] h-[90%] ">
                  {/* player image */}
                  <Image
                    className="w-40 h-48 ml-10 object-cover"
                    src={playerImage}
                    alt="player Image"
                  />
                  
                  {/* shadow */}
                  <div
                    className={`w-full h-40 absolute top-[35%] left-0 ${
                      player.cardType === "gold"
                        ? "bg-linear-to-t from-transparent via-[#F9E07F] to-transparent"
                        : player.cardType === "white"
                          ? "bg-linear-to-t from-transparent via-[#E5E5E7] to-transparent"
                          : "bg-linear-to-t from-transparent via-[#F5DCCE] to-transparent"
                    }`}
                  ></div>
                  {/* name */}
                  <div
                    className={` absolute text-black text-2xl font-semibold text-center border-b pb-2 w-[80%]  top-[49%] left-1/2 -translate-x-1/2 z-10`}
                  >
                    {player.name}
                  </div>

                  <div className="text-black relative z-10 mt-2">
                    {/*  */}
                    <div className="flex items-center justify-between gap-4 p-3">
                        {/* left */}
                      <div className="flex-1">
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {player.stats.pac}
                          </span>
                          <span className="font-semibold text-gray-700">
                            PAC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {player.stats.sho}
                          </span>
                          <span className="font-semibold text-gray-700">
                            SHO
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {player.stats.pas}
                          </span>
                          <span className="font-semibold text-gray-700">
                            PAS
                          </span>
                        </div>
                      </div>
                      <div className="h-16 border-r border-border"></div>
                      {/* right */}
                      <div className="flex-1">
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {player.stats.dri}
                          </span>
                          <span className="font-semibold text-gray-700">
                            DRI
                          </span>
                        </div>
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {player.stats.def}
                          </span>
                          <span className="font-semibold text-gray-700">
                            DEF
                          </span>
                        </div>
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {player.stats.phy}
                          </span>
                          <span className="font-semibold text-gray-700">
                            PHY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%] border-b border-border mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
