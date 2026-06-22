import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import styles from './EditPropertyModal.module.css';

interface EditPropertyModalProps {
  property: any;
  onClose: () => void;
  onSave: (updatedProperty: any) => void;
}

export default function EditPropertyModal({ property, onClose, onSave }: EditPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: property.title || '',
    price: property.price || 0,
    location: property.location || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/properties/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: property.id || property._id,
          _key: property._key,
          type: property.type || property.propertyType,
          updates: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      const result = await response.json();
      onSave({ ...property, ...formData });
    } catch (error) {
      console.error(error);
      alert('Error updating property.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit Property</h2>
          <button onClick={onClose} className={styles.closeBtn}><X size={20} /></button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className={styles.inputField} 
              placeholder="e.g., 2 BHK Flat in Chennai" 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Location / City</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              className={styles.inputField} 
              placeholder="e.g., Anna Nagar, Chennai" 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Expected Rent / Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className={styles.inputField} 
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSave} className={styles.saveBtn} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
