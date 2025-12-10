import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { 
  getSiteSettings, 
  updateSiteSettings,
  SiteSettings 
} from '../lib/api';
import { Save, Settings } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface SiteSettingsManagementProps {
  onLogout?: () => void;
}

export function SiteSettingsManagement({ onLogout: _onLogout }: SiteSettingsManagementProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    yearsOfExperience: '',
    happyClients: '',
    clientSatisfaction: '',
    propertiesManaged: '',
    companyFoundedYear: 0
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const siteSettings = await getSiteSettings();
      setSettings(siteSettings);
      setFormData({
        yearsOfExperience: siteSettings.yearsOfExperience || '10+',
        happyClients: siteSettings.happyClients || '56+',
        clientSatisfaction: siteSettings.clientSatisfaction || '98%',
        propertiesManaged: siteSettings.propertiesManaged || '50+',
        companyFoundedYear: siteSettings.companyFoundedYear || 2014
      });
    } catch (error: any) {
      console.error('Error loading site settings:', error);
      setError(error.message || 'Failed to load site settings');
      // Set defaults if error
      setFormData({
        yearsOfExperience: '10+',
        happyClients: '56+',
        clientSatisfaction: '98%',
        propertiesManaged: '50+',
        companyFoundedYear: 2014
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      await updateSiteSettings(formData);
      await loadSettings();
      alert('Site settings updated successfully!');
    } catch (error: any) {
      console.error('Error saving site settings:', error);
      setError(error.message || 'Failed to save site settings');
      alert('Failed to save site settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0A1A2F] mb-2">
                    Site Settings
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage site-wide statistics and information displayed across the website
                  </p>
                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                      <strong>Error:</strong> {error}
                    </div>
                  )}
                </div>
                <Button
                  onClick={loadSettings}
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8A75B]"></div>
              <p className="mt-4 text-gray-600">Loading site settings...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings size={24} className="text-[#C8A75B]" />
                <h3 className="text-lg font-semibold text-[#0A1A2F]">Company Statistics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                    placeholder="10+"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Displayed as: "10+ Years of Trust"</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Happy Clients *
                  </label>
                  <input
                    type="text"
                    value={formData.happyClients}
                    onChange={(e) => setFormData({ ...formData, happyClients: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                    placeholder="56+"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Displayed as: "56+ Happy Clients"</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Satisfaction *
                  </label>
                  <input
                    type="text"
                    value={formData.clientSatisfaction}
                    onChange={(e) => setFormData({ ...formData, clientSatisfaction: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                    placeholder="98%"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Displayed as: "98% Client Satisfaction"</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Properties Managed *
                  </label>
                  <input
                    type="text"
                    value={formData.propertiesManaged}
                    onChange={(e) => setFormData({ ...formData, propertiesManaged: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                    placeholder="50+"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Displayed as: "50+ Properties Managed"</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Founded Year
                  </label>
                  <input
                    type="number"
                    value={formData.companyFoundedYear}
                    onChange={(e) => setFormData({ ...formData, companyFoundedYear: parseInt(e.target.value) || 2014 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                    placeholder="2014"
                    min="1900"
                    max="2100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Used to calculate years of experience</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#C8A75B] text-white hover:bg-[#B8964A]"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={loadSettings}
                  disabled={saving}
                >
                  Reset
                </Button>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

