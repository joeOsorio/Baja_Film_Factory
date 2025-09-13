import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Phone, MapPin, Shield, Clock, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";

const Guide = () => {
  const steps = [
    {
      title: "Planificación Inicial",
      icon: FileText,
      items: [
        "Definir tipo de producción y locaciones necesarias",
        "Establecer fechas de grabación y cronograma",
        "Preparar documentación del proyecto",
        "Contactar autoridades locales pertinentes"
      ]
    },
    {
      title: "Permisos y Documentación",
      icon: Shield,
      items: [
        "Solicitar permisos municipales de filmación",
        "Obtener autorizaciones de locaciones específicas",
        "Tramitar permisos de tránsito si es necesario",
        "Verificar seguros de responsabilidad civil"
      ]
    },
    {
      title: "Coordinación Logística",
      icon: MapPin,
      items: [
        "Reservar equipo técnico y personal",
        "Coordinar transporte y hospedaje",
        "Establecer servicios de catering",
        "Planificar seguridad del set"
      ]
    },
    {
      title: "Ejecución",
      icon: CheckCircle2,
      items: [
        "Verificar permisos antes del rodaje",
        "Mantener comunicación con autoridades",
        "Cumplir horarios establecidos",
        "Respetar regulaciones ambientales y de ruido"
      ]
    }
  ];

  const contacts = [
    {
      entity: "Ayuntamiento de Tijuana - Filmaciones",
      phone: "+52 664 973 7000",
      email: "filmaciones@tijuana.gob.mx",
      address: "Palacio Municipal, Centro",
      hours: "Lunes a Viernes, 8:00 AM - 3:00 PM"
    },
    {
      entity: "Secretaría de Turismo BC",
      phone: "+52 664 682 3367",
      email: "turismo@baja.gob.mx",
      address: "Paseo de los Héroes 9365-201",
      hours: "Lunes a Viernes, 9:00 AM - 5:00 PM"
    },
    {
      entity: "Comisión de Filmaciones BC",
      phone: "+52 664 634 2000",
      email: "filmbc@baja.gob.mx",
      address: "Centro de Gobierno",
      hours: "Lunes a Viernes, 8:00 AM - 4:00 PM"
    }
  ];

  const regulations = [
    {
      category: "Horarios",
      icon: Clock,
      details: [
        "Filmaciones diurnas: 7:00 AM - 7:00 PM",
        "Filmaciones nocturnas: Permiso especial requerido",
        "Domingos y festivos: Restricciones adicionales",
        "Zonas residenciales: Horarios limitados"
      ]
    },
    {
      category: "Costos Estimados",
      icon: DollarSign,
      details: [
        "Permiso municipal básico: $500 - $2,000 MXN",
        "Uso de vía pública: $200 - $800 MXN por día",
        "Locaciones especiales: Variable según sitio",
        "Seguridad adicional: $1,500 - $3,000 MXN por día"
      ]
    },
    {
      category: "Restricciones",
      icon: AlertCircle,
      details: [
        "Prohibido bloquear completamente vías principales",
        "Respetar niveles de ruido en zonas residenciales",
        "No dañar infraestructura pública o privada",
        "Mantener acceso a servicios de emergencia"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guía de Producción</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas saber para filmar en Tijuana: permisos, contactos, regulaciones y procedimientos paso a paso.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Proceso de Filmación</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative hover:shadow-card transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-secondary-foreground">
                  {index + 1}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Contacts */}
      <section className="py-16 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contactos Gubernamentales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{contact.entity}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{contact.email}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                    <span className="text-sm text-muted-foreground">{contact.address}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">{contact.hours}</span>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(`tel:${contact.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Llamar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Regulaciones y Costos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regulations.map((regulation, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader className="text-center">
                  <regulation.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-xl">{regulation.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {regulation.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Recursos Adicionales</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Documentos, formularios y recursos útiles para tu producción
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-auto p-4">
              <div className="text-left">
                <FileText className="w-6 h-6 text-primary mb-2" />
                <div className="font-semibold">Formulario de Permisos</div>
                <div className="text-sm text-muted-foreground">Descarga el formato oficial</div>
              </div>
            </Button>
            
            <Button variant="outline" size="lg" className="h-auto p-4">
              <div className="text-left">
                <Shield className="w-6 h-6 text-secondary mb-2" />
                <div className="font-semibold">Lista de Seguros</div>
                <div className="text-sm text-muted-foreground">Compañías recomendadas</div>
              </div>
            </Button>
            
            <Button variant="outline" size="lg" className="h-auto p-4">
              <div className="text-left">
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <div className="font-semibold">Mapa de Restricciones</div>
                <div className="text-sm text-muted-foreground">Zonas y limitaciones</div>
              </div>
            </Button>
            
            <Button variant="outline" size="lg" className="h-auto p-4">
              <div className="text-left">
                <Phone className="w-6 h-6 text-secondary mb-2" />
                <div className="font-semibold">Números de Emergencia</div>
                <div className="text-sm text-muted-foreground">Contactos esenciales</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas Ayuda Personalizada?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nuestro equipo puede asistirte con el proceso de permisos y coordinación
          </p>
          <Button variant="secondary" size="xl">
            <Phone className="w-5 h-5" />
            Contactar Asesor
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Guide;