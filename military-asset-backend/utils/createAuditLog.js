import AuditLog from "../models/AuditLog.js";

const createAuditLog = async ({
  user,
  action,
  entity,
  entityId,
  details,
}) => {
  await AuditLog.create({
    user,
    action,
    entity,
    entityId,
    details,
  });
};

export default createAuditLog;