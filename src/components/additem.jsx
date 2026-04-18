import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddItem({ refresh }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    condition: "Good",
    category: "Electronics",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Item name is required";
    if (!form.price || form.price <= 0) newErrors.price = "Valid price is required";
    if (!image) newErrors.image = "Item image is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const upload = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const imgRef = ref(storage, `items/${Date.now()}_${image.name}`);
      await uploadBytes(imgRef, image);
      const url = await getDownloadURL(imgRef);

      await addDoc(collection(db, "items"), {
        ...form,
        imageURL: url,
        createdAt: new Date(),
      });

      alert("✅ Item posted successfully!");
      setForm({ name: "", price: "", condition: "Good", category: "Electronics", description: "" });
      setImage(null);
      setPreview(null);
      setShowForm(false);
      refresh?.();
    } catch (error) {
      console.error("Error uploading:", error);
      alert("❌ Error uploading item: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-gradient-to-r from-emerald-400 to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all mb-8 flex items-center justify-center gap-3 text-lg"
      >
        <span className="text-2xl">📦</span> Post a New Item
      </button>
    );
  }

  return (
    <div className="glass p-8 mb-8 max-w-3xl rounded-2xl border border-white/50 shadow-lg animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
          <span className="text-3xl">📦</span> Post Your Item
        </h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>
      </div>
      
      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-gray-700">📸 Item Image *</label>
        <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50 transition-all">
          {preview ? (
            <div>
              <img src={preview} alt="Preview" className="w-40 h-40 object-cover mx-auto rounded-xl shadow-lg mb-4" />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                }}
                className="text-sm bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-semibold transition"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div>
              <p className="text-4xl mb-3">📷</p>
              <p className="text-gray-600 mb-2 font-medium">Click to upload image</p>
              <p className="text-gray-400 text-sm mb-4">PNG, JPG, GIF up to 10MB</p>
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="imageInput"
                accept="image/*"
              />
              <label htmlFor="imageInput" className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition inline-block">
                Select Image
              </label>
            </div>
          )}
        </div>
        {errors.image && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠️</span>{errors.image}</p>}
      </div>

      {/* Item Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">Item Name *</label>
        <input
          type="text"
          placeholder="e.g., Physics Textbook, Laptop, Backpack..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.name}</p>}
      </div>

      {/* Category & Condition */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">📁 Category</label>
          <select
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Electronics</option>
            <option>Books</option>
            <option>Furniture</option>
            <option>Clothing</option>
            <option>Sports</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">✨ Condition</label>
          <select
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
          >
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Used</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">💰 Price (₹) *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">₹</span>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        {errors.price && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.price}</p>}
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">📝 Description *</label>
        <textarea
          placeholder="Describe the item condition, features, and reason for selling... (e.g., 'Barely used, in perfect condition, light scratches only')"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
          rows="4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <p className="text-xs text-gray-500 mt-2">{form.description.length}/500 characters</p>
        {errors.description && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.description}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          onClick={upload}
          disabled={loading}
          className="flex-1 btn-primary py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          {loading ? "⏳ Posting..." : "✅ Post Item to Marketplace"}
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddItem;