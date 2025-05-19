import { useState, useEffect } from 'react';
import './QuoteForm.css';

const ModernQuoteForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: ''
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          timeline: '',
          details: ''
        });
        setErrors({});
        setStep(1);
      }, 300);
    }
  }, [isOpen]);

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    } else if (step === 2) {
      if (!formData.projectType) newErrors.projectType = 'Please select a project type';
      if (!formData.budget) newErrors.budget = 'Please select a budget range';
      if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    } else if (step === 3) {
      if (!formData.details.trim()) newErrors.details = 'Please provide project details';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.budget) newErrors.budget = 'Please select a budget range';
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    if (!formData.details.trim()) newErrors.details = 'Please provide project details';
    
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(prevStep => Math.min(prevStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const message = `New Quote Request:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Type: ${formData.projectType}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
Details: ${formData.details}`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = '1234567890';
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappURL, '_blank');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300">
      <div 
        className={`bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl transition-all duration-500 modern-quote-modal ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-stone-200 to-neutral-100 p-6 bg-pattern">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-stone-300/30 rounded-full blur-xl floating-blur"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-stone-400/20 rounded-full blur-xl floating-blur"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <h2 className="text-2xl font-bold text-stone-800">Design Consultation</h2>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-stone-700 hover:bg-stone-100 transition-colors"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-6 relative z-10 form-step-indicators">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${i + 1 === step ? 'bg-stone-800 text-white scale-110 step-active' : i + 1 < step ? 'bg-stone-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
                  {i + 1}
                </div>
                <div className="text-xs mt-1 font-medium text-stone-600">
                  {i === 0 ? 'Contact' : i === 1 ? 'Project' : 'Details'}
                </div>
              </div>
            ))}
            
            <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -translate-y-1/2 z-0">
              <div 
                className="h-full bg-stone-600 transition-all duration-300"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 form-step-enter">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.name ? 'border-red-400' : 'border-stone-200'}`}
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.email ? 'border-red-400' : 'border-stone-200'}`}
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.phone ? 'border-red-400' : 'border-stone-200'}`}
                />
                {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6 form-step-enter">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.projectType ? 'border-red-400' : 'border-stone-200'}`}
                >
                  <option value="">Select Project Type</option>
                  <option value="Residential Interior">Residential Interior</option>
                  <option value="Commercial Space">Commercial Space</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Design Consultation">Design Consultation</option>
                  <option value="Other">Other</option>
                </select>
                {errors.projectType && <div className="text-red-500 text-sm mt-1">{errors.projectType}</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="budget">Estimated Budget</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.budget ? 'border-red-400' : 'border-stone-200'}`}
                >
                  <option value="">Select Budget Range</option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                  <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                  <option value="Above $50,000">Above $50,000</option>
                </select>
                {errors.budget && <div className="text-red-500 text-sm mt-1">{errors.budget}</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="timeline">Desired Timeline</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.timeline ? 'border-red-400' : 'border-stone-200'}`}
                >
                  <option value="">Select Timeline</option>
                  <option value="As Soon As Possible">As Soon As Possible</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="Within 3 Months">Within 3 Months</option>
                  <option value="Within 6 Months">Within 6 Months</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.timeline && <div className="text-red-500 text-sm mt-1">{errors.timeline}</div>}
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="form-step-enter">
              <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="details">Project Details</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Please share any specific requirements or ideas for your project..."
                rows={6}
                className={`w-full p-3 bg-stone-50 border rounded-lg focus-ring transition-all ${errors.details ? 'border-red-400' : 'border-stone-200'}`}
              ></textarea>
              {errors.details && <div className="text-red-500 text-sm mt-1">{errors.details}</div>}
              
              <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-100">
                <h3 className="text-sm font-semibold text-stone-700">Summary</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="block text-stone-500">Name:</span>
                    <span className="font-medium">{formData.name || '—'}</span>
                  </div>
                  <div>
                    <span className="block text-stone-500">Email:</span>
                    <span className="font-medium">{formData.email || '—'}</span>
                  </div>
                  <div>
                    <span className="block text-stone-500">Phone:</span>
                    <span className="font-medium">{formData.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="block text-stone-500">Project:</span>
                    <span className="font-medium">{formData.projectType || '—'}</span>
                  </div>
                  <div>
                    <span className="block text-stone-500">Budget:</span>
                    <span className="font-medium">{formData.budget || '—'}</span>
                  </div>
                  <div>
                    <span className="block text-stone-500">Timeline:</span>
                    <span className="font-medium">{formData.timeline || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-stone-50 px-8 py-4 flex justify-between">
          {step > 1 ? (
            <button 
              onClick={prevStep} 
              className="px-5 py-2.5 border border-stone-300 rounded-lg text-stone-700 font-medium hover:bg-stone-100 transition-colors lift-on-hover"
            >
              Back
            </button>
          ) : (
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 border border-stone-300 rounded-lg text-stone-700 font-medium hover:bg-stone-100 transition-colors lift-on-hover"
            >
              Cancel
            </button>
          )}
          
          {step < totalSteps ? (
            <button 
              onClick={nextStep} 
              className="px-6 py-2.5 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-700 transition-colors lift-on-hover"
            >
              Continue
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              className="px-6 py-2.5 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-700 transition-colors lift-on-hover"
            >
              Submit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernQuoteForm;