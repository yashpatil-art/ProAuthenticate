import React, { useState } from 'react';

const ProductModal = ({ onClose, onSubmit, farmLocation }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'kg',
    farmLocation: farmLocation || '',
    harvestDate: '',
    images: [],
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQualityParamChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      qualityParameters: {
        ...prev.qualityParameters,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getQualityFields = () => {
    switch (formData.category) {
      case 'sugar':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purity Level</label>
            <input
              type="text"
              name="purity"
              value={formData.qualityParameters.purity}
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
              value={formData.qualityParameters.grade}
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
              value={formData.qualityParameters.curcuminContent}
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
              value={formData.qualityParameters.ripenessStage}
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
                  value={formData.name}
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
                  value={formData.category}
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
                value={formData.description}
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
                  value={formData.price}
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
                  value={formData.quantity}
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
                  value={formData.unit}
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
                  value={formData.farmLocation}
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
                  value={formData.harvestDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Quality Parameters */}
          {formData.category && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Parameters</h3>
              {getQualityFields()}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="product-images"
              />
              <label
                htmlFor="product-images"
                className="cursor-pointer block"
              >
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl">📷</span>
                </div>
                <p className="text-gray-600 mb-1">Click to upload product images</p>
                <p className="text-gray-500 text-sm">Upload up to 5 images (JPEG, PNG, Max 5MB each)</p>
              </label>
            </div>

            {/* Preview Images */}
            {formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Selected images ({formData.images.length}/5):</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
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
                  : 'btn-primary text-white'
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