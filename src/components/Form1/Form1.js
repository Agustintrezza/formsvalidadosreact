import React from "react";
import "./Form1Styles.css";
import { FaUser } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("Es email es obligatorio"),
  password: yup
    .string()
    .required("El password es requerido")
    .min(4, "El password debe tener al menos 4 caracteres")
    .max(15, "El password debe tener como máximo 15 caracteres"),
});

export const Form1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);


  return (
    <div>
      <div className="App">
        <div className="bodyfake">
          <div className="login-div">
            <div className="logo">
              <FaUser className="userlogo" />
            </div>
            <div className="titulo">TÍTULO</div>
            <div className="subtitulo">Un subtítulo agregado</div>

            <form className="campos" onSubmit={handleSubmit(onSubmit)}>
              <div className="usuario">
                <HiOutlineUser className="svg" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              {/* <p className="mensaje">{errors.email?.type === 'required' && "El email es requerido"}</p> */}
              <p className="mensaje">{errors.email?.message}</p>

              <div className="contraseña">
                <RiLockPasswordLine className="svg" />
                <input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", { required: true })}
                />
              </div>
              <p className="mensaje">{errors.password?.message}</p>

              <button type="submit" className="boton">
                Ingresar
              </button>
              <div className="link">
                <Link to="/">Olvidé mi password</Link> o <Link to="/"> Registrar </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
