
export type CleanPerfilSummary = {
  nombre: string;
  headline: string;
  resumen: string;
  ubicacion: string;
  experiencia_destacada: string[];
  habilidades_destacadas: string[];
};

export function limpiarPerfilLinkedIn(data: any): CleanPerfilSummary {
  const nombre = `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim();
  const headline = data.headline || '';
  const resumen = data.summary || '';
  const ubicacion = data.geo?.full || '';

  const experiencia_destacada = (data.position || [])
    .slice(0, 3)
    .map((p: any) => {
      const empresa = p.companyName || '';
      const puesto = p.title || '';
      const desc = p.description?.slice(0, 200) || '';
      return `• ${puesto} en ${empresa}: ${desc}`;
    });

  const habilidades_destacadas = (data.skills || [])
    .sort((a: any, b: any) => (b.endorsementsCount || 0) - (a.endorsementsCount || 0))
    .slice(0, 5)
    .map((s: any) => s.name);

  return {
    nombre,
    headline,
    resumen,
    ubicacion,
    experiencia_destacada,
    habilidades_destacadas
  };
}
