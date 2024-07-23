import React from 'react';

const ImageModal = ({ imageSrc, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'image.png'; // You can customize the filename here
    link.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          &times;
        </button>
        <img src={imageSrc} alt="Selected" className="max-w-full max-h-screen" />
        <button
          onClick={handleDownload}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
