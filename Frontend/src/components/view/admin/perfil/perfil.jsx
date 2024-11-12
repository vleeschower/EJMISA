import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const navigate = useNavigate();
    
    // Obtén el id_usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const { id_usuario } = user;  // Tomamos el id_usuario del objeto guardado en localStorage

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    // Obtener los datos del usuario cuando se cargue el componente
    useEffect(() => {
        if (id_usuario) {
            axios.get(`http://localhost:3002/api/admin_usuarios/${id_usuario}`)
                .then(response => {
                    const { nombre, correo, password } = response.data;
                    setNombre(nombre);
                    setCorreo(correo);
                    setPassword(password);
                })
                .catch(error => {
                    console.error('Error al obtener el usuario:', error);
                });
        }
    }, [id_usuario]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar los datos actualizados al backend en formato JSON
        axios.put(`http://localhost:3002/api/admin_usuarios/${id_usuario}`, { nombre, correo, password })
            .then(response => {
                console.log('Perfil actualizado:', response.data);
                Swal.fire({
                    title: 'Éxito!',
                    text: 'Perfil actualizado con éxito.',
                    icon: 'success',
                    confirmButtonColor: '#30449e',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Actualiza los datos en localStorage
                        localStorage.setItem('user', JSON.stringify({
                            ...user,
                            nombre,
                            correo,
                            password
                        }));

                        navigate('/admin/perfil');
                    }
                });
            })
            .catch(error => {
                console.error('Error al actualizar el perfil:', error);
            });
    };
    const handleCancelar = () => {
        navigate(-1);  // Redirige al usuario a la página anterior
    };

    return (
        <div className="container my-4">
            <h2 className="text-white">Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4">
                <div className="mb-3">
                    <label htmlFor="producto" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="producto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
                    <button type="button" onClick={handleCancelar} className='btn btn-danger'>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default Perfil;