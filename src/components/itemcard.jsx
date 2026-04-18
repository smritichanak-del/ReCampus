import { useState } from "react";
import ChatBox from "./chatbox";

function ItemCard({ item }) {
  const [chat, setChat] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="card overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-white/50 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg mb-4 group">
        <img
          src={item.imageURL}
          alt={item.name}
          className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-500 ease-out"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`badge badge-success font-semibold px-3 py-1 shadow-lg ${
            item.condition === "Like New" ? "bg-emerald-100 text-emerald-800" :
            item.condition === "Good" ? "bg-green-100 text-green-800" :
            "bg-amber-100 text-amber-800"
          }`}>
            ✓ {item.condition}
          </span>
        </div>

        {item.category && (
          <div className="absolute bottom-3 left-3">
            <span className="badge bg-blue-100/80 text-blue-700 backdrop-blur-sm font-semibold">
              📁 {item.category}
            </span>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 left-3 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110"
        >
          <span className={`text-xl transition-transform ${isLiked ? 'scale-110' : ''}`}>
            {isLiked ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {item.description}
          </p>
        )}

        {/* Price Section */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ₹{item.price}
            </span>
            <span className="text-sm text-gray-500 line-through">₹{Math.round(item.price * 1.8)}</span>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Save {Math.round((1 - item.price / (item.price * 1.8)) * 100)}%
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mb-4 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl">👤</span>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Seller</p>
            <p className="text-sm font-semibold text-gray-900">{item.sellerName || "Campus Student"}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="btn-primary w-full mb-2 font-semibold py-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          onClick={() => setChat(!chat)}
        >
          💬 {chat ? "Close Chat" : "Contact Seller"}
        </button>

        {/* Chat Section */}
        {chat && (
          <div className="mt-4 border-t pt-4 animate-scale-in">
            <ChatBox item={item} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;