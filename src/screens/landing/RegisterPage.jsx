import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getWalletAddress } from "../../utils/additionalFunc";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
  validateWalletAddress,
} from "../../utils/inputValidator";
import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
import { createUserApi, getSponsorByReferralApi } from "../../api/auth.api";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../constants/routes";
import { MainContent } from "../../constants/mainContent";
import { User, Mail, Phone, MapPin, Key, Wallet, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [sponsorName, setSponsorName] = useState("");

  const [formData, setFormData] = useState({
    referral: "",
    walletAddress: "",
    username: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (search) {
      const urlParams = new URLSearchParams(search);
      const referralCode = urlParams.get('referral') || "";
      setFormData({
        ...formData,
        referral: referralCode,
      });
    }
  }, [search]);

  useEffect(() => {
    const fetchSponsor = async () => {
      if (formData.referral && formData.referral.length >= 7) {
        try {
          const res = await getSponsorByReferralApi(formData.referral);
          if (res?.success) {
            setSponsorName(res?.data?.username);
          } else {
            setSponsorName("Invalid referral code");
          }
        } catch (error) {
          setSponsorName("Error fetching sponsor");
        }
      } else {
        setSponsorName("");
      }
    };
    fetchSponsor();
  }, [formData.referral]);

  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNavigate = () => {
    navigate(AuthenticatedUserRouters.DASHBOARD);
  };

  const validate = () => {
    const validationErrors = {};
    let isValid = true;

    if (!formData.referral.trim()) {
      validationErrors.referral = "Referral code is required";
      isValid = false;
    }

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 3) {
      validationErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      validationErrors.email = "Invalid email format";
      isValid = false;
    }

    const mobileRegex = /^[0-9]{7,15}$/;
    if (!formData.mobile.trim()) {
      validationErrors.mobile = "Phone number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      validationErrors.mobile = "Invalid phone number (7-15 digits only)";
      isValid = false;
    }

    const walletAddressError = validateWalletAddress(formData.walletAddress) || "";
    if (walletAddressError) {
      validationErrors.walletAddress = walletAddressError;
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleRegisterClick = async (walletAddress) => {
    try {
      dispatch(setLoading(true));
      const response = await createUserApi({
        ...formData,
        walletAddress: walletAddress || formData.walletAddress,
        password: (walletAddress || formData.walletAddress),
      });

      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Registration Success",
          text: "You have registered successfully",
          timer: 3000,
        }).then(() => {
          handleNavigate();
        });
      } else {
        toast.error(
          response?.response?.data?.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
        timer: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleSubmit = () => {
    if (validate()) {
      handleRegisterClick();
    } else {
      toast.error("Please fill the required fields.");
    }
  };
  const getWalletAddressConnect = async (type) => {
    try {
      dispatch(setLoading(true));
      const response = await getWalletAddress(type);
      setFormData({ ...formData, walletAddress: response });
      sessionStorage.setItem("walletType", response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Wallet Connect Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <WalletOptionModal
        hide={() => setShowWalletModal(false)}
        connectWallet={(wallet) => getWalletAddressConnect(wallet)}
        show={showWalletModal}
      />
      <div
        className="text-ecru pt-24 min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "#000" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.20 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="w-full max-w-2xl hero-glass rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6 h-40">
              <div className="">
                <img
                  src={MainContent.fullLogo}
                  className="h-24 w-24 cursor-pointer z-10"
                  alt="App Logo"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-ecru mb-2">
              Create Your Account
            </h1>
            <p className="text-beaver">
              Join theAIQuantum Crypto community and start your investment journey
            </p>
          </div>

          {/* Registration Form */}
          <div className="space-y-5">

            {/* Referral Code + Sponsor — 2 col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-beaver flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Referral Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter referral code"
                  className="w-full input-field focus:border-chamoisee focus:ring-2 focus:ring-chamoisee/20"
                  value={formData.referral}
                  onChange={(e) => handleChange(e, "referral")}
                />
                {errors.referral && <p className="text-red-400 text-xs">{errors.referral}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm text-beaver flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sponsor Name
                </label>
                <input
                  type="text"
                  placeholder="Auto-filled from referral code"
                  readOnly
                  className="w-full input-field bg-space-cadet/80 cursor-not-allowed text-ecru"
                  value={sponsorName}
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-sm text-beaver flex items-center gap-2">
                <User className="w-4 h-4" />
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Choose a unique username"
                className="w-full input-field focus:border-chamoisee focus:ring-2 focus:ring-chamoisee/20"
                value={formData.username}
                onChange={(e) => handleChange(e, "username")}
              />
              {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
            </div>

            {/* Email + Mobile — 2 col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-beaver flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full input-field focus:border-chamoisee focus:ring-2 focus:ring-chamoisee/20"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm text-beaver flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="7-15 digit phone number"
                  className="w-full input-field focus:border-chamoisee focus:ring-2 focus:ring-chamoisee/20"
                  value={formData.mobile}
                  onChange={(e) => handleChange(e, "mobile")}
                />
                {errors.mobile && <p className="text-red-400 text-xs">{errors.mobile}</p>}
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-1">
              <label className="text-sm text-beaver flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Wallet Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Connect your wallet to fill this"
                  readOnly
                  className="w-full input-field bg-space-cadet/80 cursor-not-allowed text-beaver pr-36"
                  value={formData.walletAddress}
                />
                <button
                  type="button"
                  onClick={() => setShowWalletModal(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg py-2 px-4 text-sm font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #22c55e, #a3e635)", color: "#000" }}
                >
                  Connect Wallet
                </button>
              </div>
              {errors.walletAddress && <p className="text-red-400 text-xs">{errors.walletAddress}</p>}
            </div>

            {/* Submit */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 mt-2 rounded-lg font-bold text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ background: "linear-gradient(135deg, #22c55e, #a3e635)", color: "#000", fontFamily: "'Orbitron', monospace", boxShadow: "0 0 20px rgba(0,255,159,0.25), 0 0 40px rgba(0,255,159,0.08)" }}
              onClick={handleSubmit}
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </button>
          </div>


          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-delft-blue text-center">
            <p className="text-beaver">
              Already have an account?{" "}
              <Link
                to={LandingRouters.USER_LOGIN}
                className="font-semibold text-green-500 duration-200"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;