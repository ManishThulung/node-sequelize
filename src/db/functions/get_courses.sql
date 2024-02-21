CREATE OR REPLACE FUNCTION get_courses()
RETURNS TABLE (
    "id" INT,
    "name" VARCHAR
)
AS $$
BEGIN
    RETURN QUERY SELECT
        "c"."id",
        "c"."name"
    FROM "courses" "c"
    WHERE "c"."deletedAt" IS NULL;
END;
$$ LANGUAGE plpgsql;