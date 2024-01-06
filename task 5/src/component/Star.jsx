import React, { useState } from "react";

function Star(props) {
    const [isFav, setIsFav] = useState(props.isFavorite);

    async function addToFavorites() {
        try {
            if (isFav) {
                await fetch(`http://localhost:3004/favorites/${props.id}`, {
                    method: "DELETE",
                });
            } 
            else {
                await fetch("http://localhost:3004/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ id: props.id }),
                });
            }
            setIsFav(!isFav);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <svg
            onClick={() => {
                addToFavorites();
            }}
            xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"
        >
            <path
                d="M14.9787 5.69019C14.9229 5.52354 14.7785 5.40213 14.6049 5.37541L9.99354 4.67084L7.92743 0.269544C7.85008 0.105005 7.68461 0 7.50296 0C7.32131 0 7.15607 0.105005 7.07848 0.269544L5.01237 4.67084L0.401061 5.37564C0.227381 5.40213 0.0832341 5.52377 0.0272158 5.69042C-0.028568 5.85684 0.0133871 6.0406 0.136205 6.16646L3.48652 9.60186L2.69476 14.4546C2.6657 14.6318 2.74047 14.8101 2.88743 14.9133C2.96806 14.9702 3.06251 14.9991 3.15721 14.9991C3.23502 14.9991 3.31331 14.9794 3.38409 14.9405L7.50272 12.6625L11.6214 14.9405C11.6921 14.9794 11.7704 14.9991 11.8482 14.9991C11.9429 14.9991 12.0376 14.9702 12.118 14.9133C12.265 14.8101 12.3397 14.6318 12.3107 14.4546L11.5189 9.60186L14.8692 6.16646C14.9923 6.04036 15.0345 5.8566 14.9787 5.69019Z"
                fill={isFav ? "#433391" : "#b3b0ff"}
            />
        </svg>
    );
}

export default Star;
