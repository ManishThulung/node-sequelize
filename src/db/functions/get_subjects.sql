CREATE OR REPLACE FUNCTION get_subjectsss()
RETURNS TABLE (
    "id" INT,
    "name" VARCHAR
)
AS $$
BEGIN
    RETURN QUERY SELECT
        "s"."id",
        "s"."name"
    FROM "subjects" "s"
    WHERE "s"."deletedAt" IS NULL;
END;
$$ LANGUAGE plpgsql;