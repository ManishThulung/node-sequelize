-- CREATE OR REPLACE FUNCTION create_subject_g(
--     subject_name VARCHAR,
--     course_id INT
-- )
-- RETURNS VOID
-- AS $$
-- BEGIN
--     UPDATE "courses"
--     SET "deletedAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP
--     WHERE "id" = p_course_id;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_subject(
  subject_name VARCHAR,
  course_id INT
)
-- RETURNS TABLE (
--   subject_id INT,
--   s_name VARCHAR,
--   courseId INT
-- )
RETURNS VOID
AS $$
BEGIN
    -- INSERT INTO "subjects" ("name", "courseId", "createdAt", "updatedAt", "deletedAt")
    -- VALUES (subject_name, course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
    -- RETURNING "id", "name", "courseId" INTO
    -- "id", "name",  "courseId";

    -- RETURN NEXT;
    INSERT INTO "subjects" ("name", "courseId", "createdAt", "updatedAt", "deletedAt")
  VALUES (subject_name, course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
  -- RETURNING "id", "name", "courseId"; 


  -- RETURN QUERY SELECT * FROM inserted;
END;
$$ LANGUAGE plpgsql;
