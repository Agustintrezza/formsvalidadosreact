import React from "react";
import TextField from "@mui/material/TextField";
import "./Form2Styles.css";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from '@mui/styles';

import * as yup from "yup";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es un campo obligatorio"),
  apellido: yup.string().required("El apellido es un campo obligatorio"),
  edad: yup
    .number()
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .min(18, "Debes ser mayor de 18 años")
    .typeError("La edad es un campo obligatorio"),
  email: yup.string().email("Formato Inválido").required("Es email es obligatorio"),
  password: yup
    .string()
    .required("El password es requerido")
    .min(4, "El password debe tener al menos 4 caracteres")
    .max(15, "El password debe tener como máximo 15 caracteres"),
  ConfirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const useStyles = makeStyles({
  input: {
    minWidth: '343px!important',
    marginBottom: '15px!important'
    },
  password: {
    width: '38ch!important'
  },
})

export const Form2 = () => {

  const classes = useStyles()

  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  // console.log(errors);
  // reset();
  const resetearForm = () => {
    window.location.reload();
    // document.getElementById("form").reset();
  }

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const limipiarError = () => {
    setTimeout(() => {
        clearErrors(["nombre", "apellido","edad","email", "password", "ConfirmPassword"])
    }, 4000);
  }

  return (
    <div className="general">
      
      <form onSubmit={handleSubmit(onSubmit)} id="form" className="form">
        <TextField
          name="nombre"
          id="nombre"
          className={classes.input}
          label="Nombre"
          type="text"
          variant="filled"
          {...register("nombre", { required: true })}
          error={!!errors?.nombre}
          helperText={errors?.nombre ? errors.nombre.message : null}
        />
        <TextField
          name="apellido"
          id="apellido"
          className={classes.input}
          label="Apellido"
          type="text"
          variant="filled"
          {...register("apellido", { required: true })}
          error={!!errors?.apellido}
          helperText={errors?.apellido ? errors.apellido.message : null}
        />
        <TextField
          name="edad"
          id="edad"
          className={classes.input}
          label="Edad"
          variant="filled"
          type="number"
          {...register("edad", { required: true })}
          error={!!errors?.edad}
          helperText={errors?.edad ? errors.edad.message : null}
        />
        <TextField
          name="email"
          id="email"
          className={classes.input}
          label="Email"
          type="email"
          variant="filled"
          {...register("email", { required: true })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
        />
        {/* <p className="mensaje">{errors.email?.message}</p> */}
        {/* error={!!errors?.password} helperText={errors?.password ? errors.password.message : null} */}
        <FormControl
          sx={{ m: 1, width: "38ch" }}
          variant="filled"
          {...register("password", { required: true })}
          error={!!errors?.password}
          helperText={errors.password?.message}
        >
          <InputLabel
            className="input"
            name="password"
            htmlFor="filled-adornment-password"
          >
            Password
          </InputLabel>
          <FilledInput
            name="password"
            id="filled-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className="mensajealign">
          <p className="mensajes">{errors.password?.message}</p>
        </div>

        <FormControl
          sx={{ m: 1, width: "38ch" }}
          variant="filled"
          {...register("ConfirmPassword", { required: true })}
          error={!!errors?.ConfirPassword}
          helperText={errors.ConfirmPassword?.message}
        >
          <InputLabel
            className="input"
            name="ConfirmPassword"
            htmlFor="filled-adornment-password"
          >
            Confirmar Password
          </InputLabel>
          <FilledInput
            name="ConfirmPassword"
            id="ConfirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.ConfirmPassword}
            onChange={handleChange("ConfirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirmar Password"
          />
        </FormControl>
        <div className="mensajealign">
          <p className="mensajes">
            {" "}
            {errors.ConfirmPassword && "Los password debe ser idénticos"}
          </p>
        </div>

        <div className="cont-botones">
          <div>
            <IconButton onClick={resetearForm} aria-label="delete" size="large">
              <MdDelete fontSize="inherit" />
            </IconButton>
          </div>
          <div>
            <Button type="submit" variant="contained" size="medium" onClick={()=> limipiarError()}>
              ENVIAR
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form2;
