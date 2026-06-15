// import React, { useState, useEffect } from 'react';
// import { getAdminAwardStats, createRewardTierAdmin, updateRewardTierAdmin, deleteRewardTierAdmin } from '../../api/admin.api';
// import { formatCurrency, formatDate } from '../../utils/helper';
// import PageLoader from '../../components/Global/PageLoader';

// const AdminAwardManagement = () => {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [editingTier, setEditingTier] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     teamBusinessTarget: '',
//     rewardAmount: '',
//     monthlyInstallment: '',
//     totalMonths: 10,
//     description: ''
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const response = await getAdminAwardStats();

//       if (response.success) {
//         setStats(response.data);
//       } else {
//         setError(response.message || 'Failed to fetch statistics');
//       }
//     } catch (err) {
//       setError('Failed to fetch statistics');
//       console.error('Error fetching stats:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
      
//       const payload = {
//         ...formData,
//         teamBusinessTarget: parseFloat(formData.teamBusinessTarget),
//         rewardAmount: parseFloat(formData.rewardAmount),
//         monthlyInstallment: parseFloat(formData.monthlyInstallment),
//         totalMonths: parseInt(formData.totalMonths)
//       };

//       let response;
//       if (editingTier) {
//         response = await updateRewardTierAdmin(editingTier._id, payload);
//       } else {
//         response = await createRewardTierAdmin(payload);
//       }

//       if (response.success) {
//         setSuccess(editingTier ? 'Tier updated successfully!' : 'Tier created successfully!');
//         setShowCreateModal(false);
//         setEditingTier(null);
//         resetForm();
//         fetchStats();
//       } else {
//         setError(response.message || 'Operation failed');
//       }
//     } catch (err) {
//       setError('Operation failed');
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (tier) => {
//     setEditingTier(tier);
//     setFormData({
//       name: tier.name,
//       teamBusinessTarget: tier.teamBusinessTarget.toString(),
//       rewardAmount: tier.rewardAmount.toString(),
//       monthlyInstallment: tier.monthlyInstallment.toString(),
//       totalMonths: tier.totalMonths,
//       description: tier.description || ''
//     });
//     setShowCreateModal(true);
//   };

//   const handleDelete = async (tierId) => {
//     if (!window.confirm('Are you sure you want to delete this tier?')) return;

//     try {
//       setLoading(true);
//       const response = await deleteRewardTierAdmin(tierId);

//       if (response.success) {
//         setSuccess('Tier deleted successfully!');
//         fetchStats();
//       } else {
//         setError(response.message || 'Failed to delete tier');
//       }
//     } catch (err) {
//       setError('Failed to delete tier');
//       console.error('Error deleting tier:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       teamBusinessTarget: '',
//       rewardAmount: '',
//       monthlyInstallment: '',
//       totalMonths: 10,
//       description: ''
//     });
//   };

//   const closeModal = () => {
//     setShowCreateModal(false);
//     setEditingTier(null);
//     resetForm();
//   };

//   if (loading && !stats) return <PageLoader />;

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-card border border-medium rounded-2xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center">
//                 <i className="fa-solid fa-trophy text-primary-green text-xl"></i>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-light">Award Management</h1>
//                 <p className="text-muted">Manage award tiers and track statistics</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="bg-primary-green hover:bg-primary-green/80 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
//             >
//               <i className="fa-solid fa-plus"></i>
//               Create Tier
//             </button>
//           </div>

//           {stats && (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="bg-sidebar border border-dark rounded-xl p-4">
//                 <div className="flex items-center gap-3">
//                   <i className="fa-solid fa-award text-primary-green text-lg"></i>
//                   <div>
//                     <p className="text-muted text-sm">Total Awards</p>
//                     <p className="text-light font-semibold">{stats.overview.totalAwards}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-sidebar border border-dark rounded-xl p-4">
//                 <div className="flex items-center gap-3">
//                   <i className="fa-solid fa-play text-blue-400 text-lg"></i>
//                   <div>
//                     <p className="text-muted text-sm">Active Awards</p>
//                     <p className="text-light font-semibold">{stats.overview.activeAwards}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-sidebar border border-dark rounded-xl p-4">
//                 <div className="flex items-center gap-3">
//                   <i className="fa-solid fa-check text-green-400 text-lg"></i>
//                   <div>
//                     <p className="text-muted text-sm">Completed Awards</p>
//                     <p className="text-light font-semibold">{stats.overview.completedAwards}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-sidebar border border-dark rounded-xl p-4">
//                 <div className="flex items-center gap-3">
//                   <i className="fa-solid fa-dollar-sign text-yellow-400 text-lg"></i>
//                   <div>
//                     <p className="text-muted text-sm">Total Paid</p>
//                     <p className="text-light font-semibold">{formatCurrency(stats.overview.totalPaid)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Messages */}
//         {error && (
//           <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
//             <p className="text-red-400">{error}</p>
//             <button onClick={() => setError('')} className="text-red-400 hover:text-red-300 ml-2">×</button>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
//             <p className="text-green-400">{success}</p>
//             <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-300 ml-2">×</button>
//           </div>
//         )}

//         {/* Tier Statistics */}
//         <div className="bg-card border border-medium rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <i className="fa-solid fa-chart-bar text-blue-400 text-xl"></i>
//             <h2 className="text-xl font-semibold text-light">Tier Statistics</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-dark">
//                   <th className="text-left py-4 px-4 text-muted font-medium">Tier Name</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Business Target</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Reward Amount</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Monthly Payout</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Achieved Count</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Total Paid</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Status</th>
//                   <th className="text-left py-4 px-4 text-muted font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stats?.tierStats?.map((tierStat, index) => (
//                   <tr key={index} className="border-b border-dark/50 hover:bg-sidebar/50 transition-colors">
//                     <td className="py-4 px-4">
//                       <div>
//                         <p className="text-light font-medium">{tierStat.tier.name}</p>
//                         <p className="text-muted text-sm">{tierStat.tier.description}</p>
//                       </div>
//                     </td>
//                     <td className="py-4 px-4">
//                       <p className="text-light">{formatCurrency(tierStat.tier.teamBusinessTarget)}</p>
//                     </td>
//                     <td className="py-4 px-4">
//                       <p className="text-light font-medium">{formatCurrency(tierStat.tier.rewardAmount)}</p>
//                     </td>
//                     <td className="py-4 px-4">
//                       <p className="text-light">{formatCurrency(tierStat.tier.monthlyInstallment)}</p>
//                       <p className="text-muted text-sm">× {tierStat.tier.totalMonths} months</p>
//                     </td>
//                     <td className="py-4 px-4">
//                       <p className="text-light font-medium">{tierStat.achievedCount}</p>
//                     </td>
//                     <td className="py-4 px-4">
//                       <p className="text-green-400 font-medium">{formatCurrency(tierStat.totalPaid)}</p>
//                     </td>
//                     <td className="py-4 px-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         tierStat.tier.status 
//                           ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                           : 'bg-red-500/20 text-red-400 border border-red-500/30'
//                       }`}>
//                         {tierStat.tier.status ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(tierStat.tier)}
//                           className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <i className="fa-solid fa-edit"></i>
//                         </button>
//                         <button
//                           onClick={() => handleDelete(tierStat.tier._id)}
//                           className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
//                           title="Delete"
//                           disabled={tierStat.achievedCount > 0}
//                         >
//                           <i className="fa-solid fa-trash"></i>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {(!stats?.tierStats || stats.tierStats.length === 0) && (
//               <div className="text-center py-12">
//                 <i className="fa-solid fa-layer-group text-4xl text-muted mb-4"></i>
//                 <p className="text-muted">No tiers created yet</p>
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="mt-4 bg-primary-green hover:bg-primary-green/80 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Create First Tier
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recent Awards */}
//         <div className="bg-card border border-medium rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <i className="fa-solid fa-clock text-primary-green text-xl"></i>
//             <h2 className="text-xl font-semibold text-light">Recent Awards</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-dark">
//                   <th className="text-left py-3 px-4 text-muted font-medium">User</th>
//                   <th className="text-left py-3 px-4 text-muted font-medium">Tier</th>
//                   <th className="text-left py-3 px-4 text-muted font-medium">Achievement Date</th>
//                   <th className="text-left py-3 px-4 text-muted font-medium">Business Volume</th>
//                   <th className="text-left py-3 px-4 text-muted font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stats?.recentAwards?.map((award, index) => (
//                   <tr key={index} className="border-b border-dark/50 hover:bg-sidebar/50 transition-colors">
//                     <td className="py-3 px-4">
//                       <div>
//                         <p className="text-light font-medium">{award.user.username}</p>
//                         <p className="text-muted text-sm">{award.user.email}</p>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <p className="text-light">{award.achievedTier.name}</p>
//                     </td>
//                     <td className="py-3 px-4">
//                       <p className="text-light">{formatDate(award.achievedDate)}</p>
//                     </td>
//                     <td className="py-3 px-4">
//                       <p className="text-light">{formatCurrency(award.teamBusinessAtAchievement)}</p>
//                     </td>
//                     <td className="py-3 px-4">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         award.status === 'Active' 
//                           ? 'bg-green-500/20 text-green-400 border border-green-500/30'
//                           : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
//                       }`}>
//                         {award.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {(!stats?.recentAwards || stats.recentAwards.length === 0) && (
//               <div className="text-center py-8">
//                 <i className="fa-solid fa-award text-3xl text-muted mb-3"></i>
//                 <p className="text-muted">No recent awards</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-card border border-medium rounded-2xl p-6 w-full max-w-md">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-light">
//                 {editingTier ? 'Edit Tier' : 'Create New Tier'}
//               </h3>
//               <button
//                 onClick={closeModal}
//                 className="text-muted hover:text-light transition-colors"
//               >
//                 <i className="fa-solid fa-times text-xl"></i>
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-muted text-sm mb-2">Tier Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full bg-sidebar border border-dark rounded-lg px-4 py-3 text-light focus:border-primary-green focus:outline-none"
//                   placeholder="e.g., Bronze Award"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-muted text-sm mb-2">Business Target ($)</label>
//                 <input
//                   type="number"
//                   name="teamBusinessTarget"
//                   value={formData.teamBusinessTarget}
//                   onChange={handleInputChange}
//                   className="w-full bg-sidebar border border-dark rounded-lg px-4 py-3 text-light focus:border-primary-green focus:outline-none"
//                   placeholder="20000"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-muted text-sm mb-2">Total Reward ($)</label>
//                 <input
//                   type="number"
//                   name="rewardAmount"
//                   value={formData.rewardAmount}
//                   onChange={handleInputChange}
//                   className="w-full bg-sidebar border border-dark rounded-lg px-4 py-3 text-light focus:border-primary-green focus:outline-none"
//                   placeholder="500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-muted text-sm mb-2">Monthly Installment ($)</label>
//                 <input
//                   type="number"
//                   name="monthlyInstallment"
//                   value={formData.monthlyInstallment}
//                   onChange={handleInputChange}
//                   className="w-full bg-sidebar border border-dark rounded-lg px-4 py-3 text-light focus:border-primary-green focus:outline-none"
//                   placeholder="50"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-muted text-sm mb-2">Total Months</label>
//                 <input
//                   type="number"
//                   name="totalMonths"
//                   value={formData.totalMonths}
//                   onChange={handleInputChange}
//                   className="w-full bg-sidebar border border-dark rounded-lg px-4 py-3 text-light focus:border-primary-green focus:outline-none"
//                   placeholder="10"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-muted text-sm mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   className="w-full bg-sidebar border border-dark rounded-lg px-4 py-3 text-light focus:border-primary-green focus:outline-none"
//                   placeholder="Award description..."
//                   rows="3"
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="flex-1 bg-sidebar border border-dark text-light py-3 rounded-lg hover:bg-dark transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-primary-green hover:bg-primary-green/80 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   {loading ? 'Saving...' : (editingTier ? 'Update' : 'Create')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// Commented out AdminAwardManagement component - using hardcoded criteria in AwardRewardHistory instead
const AdminAwardManagement = () => {
  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="text-center">
        <i className="fa-solid fa-tools text-4xl text-muted mb-4"></i>
        <h1 className="text-2xl font-bold text-light mb-2">Award Management Disabled</h1>
        <p className="text-muted">Award criteria are now hardcoded. Use Award History page to view all awards.</p>
      </div>
    </div>
  );
};

export default AdminAwardManagement;