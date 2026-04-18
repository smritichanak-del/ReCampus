import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ItemCard from "../components/itemcard";
import AddItem from "../components/additem";
import { Link } from "react-router-dom";

function Marketplace() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [priceSort, setPriceSort] = useState("low-to-high");
  const [showFilters, setShowFilters] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      setItems(data);
      filterAndSortItems(data, searchTerm, categoryFilter, conditionFilter, priceSort);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortItems = (data, search, category, condition, sort) => {
    let filtered = data;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Condition filter
    if (condition !== "All") {
      filtered = filtered.filter((item) => item.condition === condition);
    }

    // Price sort
    if (sort === "low-to-high") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "high-to-low") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterAndSortItems(items, searchTerm, categoryFilter, conditionFilter, priceSort);
  }, [searchTerm, categoryFilter, conditionFilter, priceSort, items]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-green-50 to-white">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl font-bold text-gray-900 mb-3">🛍️ Marketplace</h1>
          <p className="text-gray-600 text-lg">Discover amazing deals on quality used items from your campus community</p>
        </div>

        {/* Add Item Section */}
        <div className="mb-8">
          <AddItem refresh={fetchItems} />
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-8 animate-slide-in-up">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search for items (Books, Laptops, Furniture...)"
                className="w-full px-6 py-4 text-lg border-2 border-green-200 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filters Grid */}
          <div className="glass p-6 rounded-2xl border border-white/50 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎯</span> Filter Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📁 Category</label>
                <select
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics">💻 Electronics</option>
                  <option value="Books">📚 Books</option>
                  <option value="Furniture">🪑 Furniture</option>
                  <option value="Clothing">👕 Clothing</option>
                  <option value="Sports">⚽ Sports</option>
                  <option value="Other">📦 Other</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">✨ Condition</label>
                <select
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value)}
                >
                  <option value="All">All Conditions</option>
                  <option value="Like New">⭐ Like New</option>
                  <option value="Good">👍 Good</option>
                  <option value="Fair">🆗 Fair</option>
                  <option value="Used">🔧 Used</option>
                </select>
              </div>

              {/* Price Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Sort by Price</label>
                <select
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                >
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                    setConditionFilter("All");
                    setPriceSort("low-to-high");
                  }}
                  className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-2.5 rounded-lg transition-all transform hover:scale-105 shadow-md"
                >
                  🔄 Reset Filters
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || categoryFilter !== "All" || conditionFilter !== "All") && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 animate-scale-in">
                      🔍 {searchTerm}
                      <button onClick={() => setSearchTerm("")} className="hover:text-green-900 font-bold">✕</button>
                    </span>
                  )}
                  {categoryFilter !== "All" && (
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 animate-scale-in">
                      📁 {categoryFilter}
                      <button onClick={() => setCategoryFilter("All")} className="hover:text-blue-900 font-bold">✕</button>
                    </span>
                  )}
                  {conditionFilter !== "All" && (
                    <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 animate-scale-in">
                      ✨ {conditionFilter}
                      <button onClick={() => setConditionFilter("All")} className="hover:text-purple-900 font-bold">✕</button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Info Section */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl p-6 shadow-md border border-gray-100 animate-fade-in">
          <div>
            <p className="text-gray-900 font-bold text-xl">
              {filteredItems.length === 0 ? "📭 " : "✅ "}
              {filteredItems.length === 0
                ? "No items found"
                : `Showing ${filteredItems.length} item${filteredItems.length !== 1 ? "s" : ""}`}
            </p>
            <p className="text-gray-500 text-sm mt-1">Available from your campus community</p>
          </div>
          {filteredItems.length > 0 && (
            <div className="text-right mt-4 md:mt-0 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <p className="text-green-600 font-bold text-3xl">
                ₹{Math.min(...filteredItems.map(i => i.price || 0))}
              </p>
              <p className="text-gray-500 text-xs">Lowest price</p>
            </div>
          )}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <p className="text-5xl mb-6 animate-bounce">⏳</p>
              <p className="text-2xl text-gray-700 font-bold mb-2">Loading items...</p>
              <p className="text-gray-500">Finding the best deals for you</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 glass p-16 rounded-3xl border-2 border-gray-200 shadow-lg animate-fade-in">
            <p className="text-7xl mb-6">📭</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No items found</h2>
            <p className="text-gray-600 text-lg mb-8">Try adjusting your search or filters</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("All");
                  setConditionFilter("All");
                  setPriceSort("low-to-high");
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
              >
                🔄 Reset Filters
              </button>
              <Link to="/dashboard">
                <button className="bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all">
                  📦 Post Item
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Pagination or Load More */}
        {filteredItems.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="bg-white text-green-600 border-2 border-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-all shadow-md">
              📜 Load More Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;