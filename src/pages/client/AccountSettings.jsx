import React, { useState } from 'react';

const AccountSettings = () => {
  const [selectedTab, setSelectedTab] = useState('account-general');

  return (
    <div className="container mx-auto px-4 py-6 bg-white">
      <h4 className="font-bold py-3 mb-4 text-lg">Account settings</h4>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 p-4 bg-gray-100">
            <div className="space-y-2">
              <button
                className={`w-full text-left p-2 rounded-lg ${selectedTab === 'account-general' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                onClick={() => setSelectedTab('account-general')}
              >
                General
              </button>
              <button
                className={`w-full text-left p-2 rounded-lg ${selectedTab === 'account-change-password' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                onClick={() => setSelectedTab('account-change-password')}
              >
                Change password
              </button>
              <button
                className={`w-full text-left p-2 rounded-lg ${selectedTab === 'account-info' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                onClick={() => setSelectedTab('account-info')}
              >
                Info
              </button>
              {/* Add more buttons as needed */}
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4 p-4">
            {selectedTab === 'account-general' && (
              <div>
                <div className="flex items-center space-x-4">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar" className="w-20 h-20 rounded-full" />
                  <div>
                    <label className="inline-block cursor-pointer border border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white">
                      Upload new photo
                      <input type="file" className="hidden" />
                    </label>
                    <button className="ml-2 text-gray-600">Reset</button>
                    <p className="text-xs text-gray-500 mt-1">Allowed JPG, GIF, or PNG. Max size of 800K</p>
                  </div>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold">Username</label>
                    <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="nmaxwell" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Name</label>
                    <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="Nelle Maxwell" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">E-mail</label>
                    <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="nmaxwell@mail.com" />
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-2 mt-2 rounded-lg">
                      Your email is not confirmed. Please check your inbox.
                      <a href="#" className="text-blue-500 ml-2">Resend confirmation</a>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Company</label>
                    <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="Company Ltd." />
                  </div>
                </div>
              </div>
            )}
            {selectedTab === 'account-change-password' && (
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold">Current password</label>
                    <input type="password" className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">New password</label>
                    <input type="password" className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Repeat new password</label>
                    <input type="password" className="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>
            )}
            {/* Add more tab content as needed */}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save changes</button>
        <button className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
      </div>
    </div>
  );
};

export default AccountSettings;
