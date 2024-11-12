"use client";

import React, { useState } from 'react';

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, label: 'Créer utilisateur' },
    { id: 2, label: 'Supprimer utilisateur' },
    { id: 3, label: 'Modifier utilisateur' },
    { id: 4, label: 'Afficher utilisateur' },
  ]);

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleCheckboxChange = (e) => {
    const permissionId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPermissions((prevPermissions) => [...prevPermissions, permissionId]);
    } else {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== permissionId)
      );
    }
  };

  return (
    <div>
      <h1>Permissions</h1>
      {permissions.map((permission) => (
        <div key={(link unavailable)}>
          <input
            type="checkbox"
            value={(link unavailable)}
            onChange={handleCheckboxChange}
          />
          <span> {permission.label}</span>
        </div>
      ))}
      <div>
      <h2>Permissions sélectionnées</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {selectedPermissions.map((permissionId) => (
            <tr key={permissionId}>
              <td>{permissionId}</td>
              <td>
                {permissions.find((permission) => (link unavailable) === permissionId).label}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Permissions;