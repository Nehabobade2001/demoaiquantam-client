import { useState } from "react";
import { useSelector } from "react-redux";
import {
  maskEmailAddress,
  maskWalletAddress,
  shareReferralCode,
} from "../../../utils/additionalFunc";
import { toast } from "react-toastify";
import { MdOutlineShare } from "react-icons/md";
import { TbCopyCheck, TbCopy } from "react-icons/tb";

const ProfileCard = () => {
  const user = useSelector((state) => state?.isLoggedUser?.data);
  console.log("=== USER DATA ===", user);
  console.log("User ID:", user?.id);
  console.log("User _id:", user?._id);
  console.log("All User Keys:", Object.keys(user || {}));
  const [copiedText1, setCopiedText1] = useState(false);
  const location = window.location.origin;
  const referCode = `${location}/register?referral=${user?.referralLink}`;
  const handleCopy = (text, setCopiedState) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedState(true);
        toast.success("Referral link copied!");
        setTimeout(() => setCopiedState(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="card hero-glass mt-10 border border-glass-border rounded-2xl p-6 flex flex-col items-center h-full">
      <img
        src={
          user?.picture || "https://api.dicebear.com/8.x/lorelei/svg?seed=Lanre"
        }
        alt="User Avatar"
        className="w-24 h-24 rounded-full border-4 border-chamoisee/50 -mt-16 shadow-lg"
      />
      <h3 className="text-xl font-bold text-hero-primary mt-4">{user?.id || "N/A"}</h3>
      <h3 className="text-xl font-bold text-hero-primary mb-2 capitalize">
        {user?.username || "N/A"}
      </h3>
      <p className="text-sm text-hero-secondary">Your Personal Profile</p>

      <hr className="w-full border-delft-blue my-4" />

      <div className="w-full space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-hero-secondary">Sponsored By:</span>
          <span className="font-semibold text-hero-primary capitalize">
            {user?.sponsor?.id || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-hero-secondary">Email:</span>
          <span className="font-semibold text-hero-primary">
            {maskEmailAddress(user?.email) || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-hero-secondary">Mobile:</span>
          <span className="font-semibold text-hero-primary">
            {maskWalletAddress(user?.mobile) || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-hero-secondary">Wallet Address:</span>
          <span className="font-semibold text-hero-primary">
            {maskWalletAddress(user?.account) || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-hero-secondary">Joined:</span>
          <span className="font-semibold text-hero-primary">
            {new Date(user?.createdAt)?.toLocaleDateString() || "N/A"}
          </span>
        </div>
      </div>

      <hr className="w-full border-delft-blue my-4" />

      {/* Referral Link - Highlighted */}
      <div className="w-full rounded-2xl border-2 border-green-500/70 bg-green-500/10 p-4 shadow-lg shadow-green-500/30 animate-pulse-glow">
        <div className="flex items-center gap-2 mb-3">
          <i className="fa-solid fa-arrow-trend-up text-green-400"></i>
          <p className="text-sm font-bold text-green-400">Your Referral Link</p>
        </div>
        <div className="relative w-full flex gap-2">
          <input
            type="text"
            readOnly
            value={referCode || "N/A"}
            disabled
            className="w-full bg-green-500/10 border border-green-500/30 rounded-xl py-3 px-4 text-green-300 text-sm font-bold font-mono pointer-events-none tracking-wide"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(referCode, setCopiedText1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-colors duration-200 border border-green-500/40"
            >
              {copiedText1 ? <TbCopyCheck size={18} /> : <TbCopy size={18} />}
            </button>
            <button
              onClick={() => shareReferralCode(referCode)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-colors duration-200 border border-green-500/40"
            >
              <MdOutlineShare size={18} />
            </button>
          </div>
        </div>
        <p className="text-xs text-green-500/70 mt-2 text-center">
          Share this link to earn referral income
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;