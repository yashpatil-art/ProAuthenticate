import React, { useState } from 'react';

const ProductModal = ({ onClose, onSubmit, farmLocation }) => {
  const [formDataState, setFormDataState] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'kg',
    farmLocation: farmLocation || '',
    harvestDate: '',
    images: [], // Changed back to array for consistency
    qualityParameters: {
      purity: '',
      grade: '',
      curcuminContent: '',
      ripenessStage: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'sugar', label: 'Sugar' },
    { value: 'cashew', label: 'Cashew' },
    { value: 'turmeric', label: 'Turmeric' },
    { value: 'banana', label: 'Banana' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQualityParamChange = (e) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({
      ...prev,
      qualityParameters: {
        ...prev.qualityParameters,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validate file size (5MB max) and type for each file
      const validFiles = Array.from(files).filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} size should be less than 5MB`);
          return false;
        }
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not an image`);
          return false;
        }
        return true;
      });

      setFormDataState(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));
    }
  };

  const removeImage = (index) => {
    setFormDataState(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Append all basic fields
      formData.append('name', formDataState.name);
      formData.append('description', formDataState.description);
      formData.append('category', formDataState.category);
      formData.append('price', formDataState.price);
      formData.append('quantity', formDataState.quantity);
      formData.append('unit', formDataState.unit);
      formData.append('farmLocation', formDataState.farmLocation);
      formData.append('harvestDate', formDataState.harvestDate);
      
      // Append quality parameters as JSON string
      formData.append('qualityParameters', JSON.stringify(formDataState.qualityParameters));
      
      // Append images - USE 'images' FIELD NAME TO MATCH BACKEND
      formDataState.images.forEach((image, index) => {
        formData.append('images', image); // This must be 'images' to match upload.array('images', 5)
      });

      // Debug: Log form data contents
      console.log('📦 FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getQualityFields = () => {
    switch (formDataState.category) {
      case 'sugar':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purity Level</label>
            <input
              type="text"
              name="purity"
              value={formDataState.qualityParameters.purity}
              onChange={handleQualityParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="e.g., 99.9% pure"
            />
          </div>
        );
      case 'cashew':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
            <select
              name="grade"
              value={formDataState.qualityParameters.grade}
              onChange={handleQualityParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="">Select Grade</option>
              <option value="W180">W180 - Super Large</option>
              <option value="W210">W210 - Large</option>
              <option value="W240">W240 - Medium</option>
              <option value="W320">W320 - Small</option>
            </select>
          </div>
        );
      case 'turmeric':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Curcumin Content</label>
            <input
              type="text"
              name="curcuminContent"
              value={formDataState.qualityParameters.curcuminContent}
              onChange={handleQualityParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="e.g., 3.5% curcumin"
            />
          </div>
        );
      case 'banana':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ripeness Stage</label>
            <select
              name="ripenessStage"
              value={formDataState.qualityParameters.ripenessStage}
              onChange={handleQualityParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="">Select Ripeness</option>
              <option value="green">Green</option>
              <option value="turning">Turning</option>
              <option value="ripe">Ripe</option>
              <option value="overripe">Overripe</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-1">Add your farm product for blockchain verification</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formDataState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="e.g., Organic Turmeric"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formDataState.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formDataState.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Describe your product, farming methods, special features..."
              />
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Quantity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formDataState.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formDataState.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  name="unit"
                  value={formDataState.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="ton">Ton</option>
                  <option value="piece">Piece</option>
                </select>
              </div>
            </div>
          </div>

          {/* Farm Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Farm Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Location *</label>
                <input
                  type="text"
                  name="farmLocation"
                  value={formDataState.farmLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Enter farm location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date *</label>
                <input
                  type="date"
                  name="harvestDate"
                  value={formDataState.harvestDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Quality Parameters */}
          {formDataState.category && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Parameters</h3>
              {getQualityFields()}
            </div>
          )}

          {/* Image Upload - Multiple Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="product-images"
                multiple // Allow multiple files
              />
              <label
                htmlFor="product-images"
                className="cursor-pointer block"
              >
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl">📷</span>
                </div>
                <p className="text-gray-600 mb-1">Click to upload product images</p>
                <p className="text-gray-500 text-sm">JPEG, PNG, Max 5MB each</p>
                <p className="text-gray-500 text-sm">You can upload multiple images</p>
              </label>
            </div>

            {/* Preview Images */}
            {formDataState.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Selected images:</p>
                <div className="flex flex-wrap gap-4">
                  {formDataState.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {loading ? 'Adding Product...' : 'Add Product for Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;