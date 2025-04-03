module.exports = (sequelize, DataTypes) => {
  return sequelize.define('File', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    accessibility: DataTypes.ENUM('free', 'paid'),
    downloadable: DataTypes.BOOLEAN,
    storage: DataTypes.ENUM('upload', 'youtube', 'vimeo', 'external_link', 'google_drive', 'dropbox', 'iframe', 's3', 'upload_archive'),
    file: DataTypes.TEXT,
    volume: DataTypes.STRING(64),
    file_type: DataTypes.STRING(64),
    interactive_type: DataTypes.ENUM('adobe_captivate', 'i_spring', 'custom'),
    interactive_file_name: DataTypes.STRING(255),
    interactive_file_path: DataTypes.STRING(255),
    check_previous_parts: DataTypes.BOOLEAN,
    access_after_day: DataTypes.INTEGER,
    online_viewer: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive'),
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER,
    deleted_at: DataTypes.INTEGER
  }, {
    tableName: 'files',
    timestamps: false
  });
};