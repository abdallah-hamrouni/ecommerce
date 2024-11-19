import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Carts = () => {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  
  // Fonction pour récupérer les données du panier
  const ajouterAuPanier = async (item,quantite=1) => {
    const token = localStorage.getItem('token'); // Assurez-vous que le token est bien dans le localStorage

    try {
        const response = await axios.post('http://localhost:5000/panier', {
            panelId: item.panelId, 
            nom: item.nom,
            prix: item.prix,
            image: item.image,
            categorie: item.categorie,
            quantite,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data.message);
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
    }
};

  
  const calculerTotal = () => {
    return panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0).toFixed(2);
};
const supprimerDuPanier = async (panelId) => {
  try {
      // Effectuer la requête de suppression
      const response = await axios.delete(`http://localhost:5000/panier/${panelId}`);
      
      // Vérifiez si la réponse est positive
      if (response.status === 200) {
          // Mettez à jour l'état du panier pour supprimer l'élément
          setPanier(panier.filter(item => item.panel !== panelId)); // Met à jour l'état
          alert('Produit supprimé avec succès !');
      }
  } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      alert("Erreur lors de la suppression du produit.");
  }
};
useEffect(() => {
    const fetchPanier = async () => {
        try {
            // Assurez-vous que vous passez le token JWT dans les headers
            const response = await axios.get(' http://localhost:5000/panier', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Token JWT stocké dans localStorage
                }
            });
            setPanier(response.data.panier.items);
        } catch (err) {
            setError('Erreur lors de la récupération du panier');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchPanier();
}, []);

if (loading) return <p>Chargement du panier...</p>;
if (error) return <p>{error}</p>;

  return (
      <>
          <div className="container px-3 my-5 clearfix">
              {/* Shopping cart table */}
              <div className="card">
                  <div className="card-header">
                      <h2>Shopping Cart</h2>
                  </div>
                  <div className="card-body">
                      <div className="table-responsive">
                          <table className="table table-bordered m-0">
                              <thead>
                                  <tr>
                                      <th className="text-center py-3 px-4" style={{ minWidth: 400 }}>Product Name &amp; Details</th>
                                      <th className="text-right py-3 px-4" style={{ width: 100 }}>Price</th>
                                      <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th>
                                      <th className="text-right py-3 px-4" style={{ width: 100 }}>Total</th>
                                      <th className="text-center align-middle py-3 px-0" style={{ width: 40 }}>
                                          <a href="/" className="shop-tooltip float-none text-light" title data-original-title="Clear cart">
                                              <i className="ino ion-md-trash" />
                                          </a>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {panier.length === 0 ? (
                                      <tr>
                                          <td colSpan="5" className="text-center">Le panier est vide</td>
                                      </tr>
                                  ) : (
                                      panier.map((item, index) => (
                                          <tr  key={index}> {/* Utilisez l'ID unique de l'article */}
                                              <td className="p-4">
                                                  <div className="media align-items-center">
                                                      <img src={item.image} className="d-block ui-w-40 ui-bordered mr-4" alt={item.nom} />
                                                      <div className="media-body">
                                                          <a href="/" className="d-block text-dark">{item.nom}</a>
                                                          <small>
                                                              <span className="text-muted">Color:</span>
                                                              <span className="ui-product-color ui-product-color-sm align-text-bottom" style={{ background: '#e81e2c' }} /> &nbsp;
                                                              <span className="text-muted">Size: </span> EU 37 &nbsp;
                                                              <span className="text-muted">Ships from: </span> China
                                                          </small>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="text-right font-weight-semibold align-middle p-4">${item.prix.toFixed(2)}</td>
                                              <td className="align-middle p-4">
                                                  <input type="number" className="form-control text-center" defaultValue={item.quantite}  />
                                              </td>
                                              <td className="text-right font-weight-semibold align-middle p-4">${(item.prix * item.quantite).toFixed(2)}</td>
                                              <td className="text-center align-middle px-0">
                                                <a href="#" 
   className="shop-tooltip close float-none text-danger" 
   title data-original-title="Remove" 
   onClick={(e) => {
       e.preventDefault(); // Évite le comportement par défaut
       supprimerDuPanier(item.panelId); // Appel de la fonction de suppression
   }}>
   ×
</a>
                                              </td>
                                          </tr>
                                      ))
                                  )}
                              </tbody>
                          </table>
                      </div>
                        {/* Affichage du total */}
                        {panier.length > 0 && (
                            <div className="text-right mt-3">
                                <h4>Total: ${calculerTotal()}</h4>
                            </div>
                        )}
                  </div>
              </div>
          </div>
      </>
  );
}
export default Carts;
