export const groupParents = (data) => {
    if (!data || data.length === 0) {
      return [];
    }
  
    const grouped = {};
    data.forEach((parent) => {
      if (!grouped[parent.ParentId]) {
        grouped[parent.ParentId] = { ...parent, children: [] };
      }
      grouped[parent.ParentId].children.push({ Name: parent.ChildName, Surname: parent.ChildSurname });
    });
    return Object.values(grouped);
  };
  