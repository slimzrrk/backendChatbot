const extractEntities = (message) => {
    const entities = {};
  
    const matieres = ['رياضيات', 'العربية', 'الفرنسية', 'علوم', 'تاريخ', 'جغرافيا'];
    const niveaux = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة', 'السنة الخامسة', 'السنة السادسة'];
  
    matieres.forEach(m => {
      if (message.includes(m)) entities.matiere = m;
    });
  
    niveaux.forEach(n => {
      if (message.includes(n)) entities.niveau = n;
    });
  
    return entities;
  };
  
  module.exports = { extractEntities };
  