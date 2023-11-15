const { db } = require('../mysql.js');
const axios = require("axios");

const listarTodos = (req, res) => {

};
const insertar = async (req, res) => {

    try {
        const url = 'https://api.nubefact.com/api/v1/c16ea3cf-bad1-4d36-a449-df085ee5aadb'
        const token = '7b3c966149524842b2af262bba5f6da0a783250cb5d946e29b37bef8abed1cd5'
        const data = {
            "operacion": "generar_comprobante",
            "tipo_de_comprobante": 1,
            "serie": "FFF1",
            "numero": 3,
            "sunat_transaction": 1,
            "cliente_tipo_de_documento": 6,
            "cliente_numero_de_documento": "10744555189",
            "cliente_denominacion": "Maria Ronsangela",
            "cliente_direccion": "Pedro Moreno",
            "cliente_email": "tucliente@gmail.com",
            "cliente_email_1": "",
            "cliente_email_2": "",
            "fecha_de_emision": getFechaEmision(),
            "fecha_de_vencimiento": "",
            "moneda": 1,
            "tipo_de_cambio": "",
            "porcentaje_de_igv": 18.00,
            "descuento_global": "",
            "total_descuento": "",
            "total_anticipo": "",
            "total_gravada": 600,
            "total_inafecta": "",
            "total_exonerada": "",
            "total_igv": 108,
            "total_gratuita": "",
            "total_otros_cargos": "",
            "total": 708,
            "percepcion_tipo": "",
            "percepcion_base_imponible": "",
            "total_percepcion": "",
            "total_incluido_percepcion": "",
            "retencion_tipo": "",
            "retencion_base_imponible": "",
            "total_retencion": "",
            "total_impuestos_bolsas": "",
            "detraccion": false,
            "observaciones": "",
            "documento_que_se_modifica_tipo": "",
            "documento_que_se_modifica_serie": "",
            "documento_que_se_modifica_numero": "",
            "tipo_de_nota_de_credito": "",
            "tipo_de_nota_de_debito": "",
            "enviar_automaticamente_a_la_sunat": true,
            "enviar_automaticamente_al_cliente": false,
            "condiciones_de_pago": "",
            "medio_de_pago": "",
            "placa_vehiculo": "",
            "orden_compra_servicio": "",
            "formato_de_pdf": "",
            "generado_por_contingencia": "",
            "bienes_region_selva": "",
            "servicios_region_selva": "",
            "items": [
                {
                    "unidad_de_medida": "ZZ",
                    "codigo": "001",
                    "codigo_producto_sunat": "20000000",
                    "descripcion": "DETALLE DEL SERVICIO",
                    "cantidad": 5,
                    "valor_unitario": 20,
                    "precio_unitario": 23.60,
                    "descuento": "",
                    "subtotal": 100,
                    "tipo_de_igv": 1,
                    "igv": 18,
                    "total": 118,
                    "anticipo_regularizacion": false,
                    "anticipo_documento_serie": "",
                    "anticipo_documento_numero": ""
                }
            ],
            "guias": [
            ],
            "venta_al_credito": [
            ]
        }

        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json',
        };


        const call = await axios.post(url, data, { headers });
        const datos = call.data;
        res.json({ datos });
    } catch (error) {
        if (error.response) {
            console.error('Respuesta de error de la API:', error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta de la API');
            res.status(500).json({ error: 'No se recibió respuesta de la API' });
        } else {
            console.error('Error durante la configuración de la solicitud:', error.message);
            res.status(500).json({ error: 'Error durante la configuración de la solicitud' });
        }
    }

};

const getFechaEmision = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
}

const actualizar = (req, res) => {

};
const eliminar = (req, res) => {

};

module.exports =  {
    listarTodos,
    insertar,
    actualizar,
    eliminar
}