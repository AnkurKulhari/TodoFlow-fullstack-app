import { AlertTriangle } from "lucide-react";
import { useState } from "react";

function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const [confirmation, setConfirmation] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        <div className="p-6">

          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-5">
            <AlertTriangle
              className="text-red-600"
              size={32}
            />
          </div>

          <h2 className="text-2xl font-bold text-center">
            Delete Account
          </h2>

          <p className="text-gray-600 text-center mt-3">
            This action is
            <span className="font-semibold text-red-600">
              {" "}permanent{" "}
            </span>
            and cannot be undone.
          </p>

          <p className="text-gray-600 text-center mt-2">
            All your todos and account data will be
            permanently deleted.
          </p>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Type{" "}
              <span className="font-bold">
                DELETE
              </span>{" "}
              to confirm
            </label>

            <input
              type="text"
              value={confirmation}
              onChange={(e) =>
                setConfirmation(e.target.value)
              }
              placeholder="DELETE"
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">

          <button
            onClick={() => {
              setConfirmation("");
              onClose();
            }}
            className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={confirmation !== "DELETE"}
            onClick={() => {
              setConfirmation("");
              onConfirm();
            }}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Delete Account
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteAccountModal;