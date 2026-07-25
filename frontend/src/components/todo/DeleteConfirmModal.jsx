import { motion } from "framer-motion";

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  todoTitle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Delete Todo
        </h2>

        <p className="text-gray-600 mt-4">
          Are you sure you want to delete
          <span className="font-semibold"> "{todoTitle}"</span>?
        </p>

        <p className="text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default DeleteConfirmModal;