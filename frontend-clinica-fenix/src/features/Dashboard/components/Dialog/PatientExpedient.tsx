import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpedient } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { CalendarDays, Pill } from "lucide-react";

interface PatientExpedientProps {
  isOpen: boolean;
  onClose: () => void;
  patientCui: string;
  patientName?: string;
}

const PatientExpedient = ({ isOpen, onClose, patientCui, patientName }: PatientExpedientProps) => {
  const { data: expedientData, isLoading } = useExpedient(patientCui);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const expedient = expedientData?.data?.expedients;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Expediente Médico - {patientName || 'Paciente'}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          <ScrollArea className="h-[calc(80vh-120px)] pr-4">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    Historial de Citas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {expedient?.citas && expedient.citas.length > 0 ? (
                    <div className="space-y-4">
                      {expedient.citas.map((cita) => (
                        <div
                          key={cita.id_citas}
                          className="rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-blue-600">
                                {formatDate(cita.date)}
                              </p>
                              <p className="mt-1 text-gray-600">
                                {cita.description}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {cita.hour}:00 hrs
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No hay citas registradas
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Prescriptions Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Pill className="h-5 w-5 text-blue-600" />
                    Historial de Recetas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {expedient?.recetas && expedient.recetas.length > 0 ? (
                    <div className="space-y-4">
                      {expedient.recetas.map((receta) => (
                        <div
                          key={receta.id_recipe}
                          className="rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="font-medium text-blue-600">
                            {receta.medicine}
                          </h4>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <p><strong>Dosis:</strong> {receta.dose}</p>
                            <p><strong>Frecuencia:</strong> {receta.frequency}</p>
                            <p><strong>Indicaciones:</strong> {receta.indications}</p>
                          </div>
                          <div className="mt-2 text-right text-sm text-gray-500">
                            <p>Dr. {receta.doctor_signature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No hay recetas registradas
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PatientExpedient;