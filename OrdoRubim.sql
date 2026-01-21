-- ════════════════════════════════════════════════════════════════════════════
--  ORDO RUBIM — SYMPHONIA CODICIS (SQL/PostGIS VERSION)
--  LIBRETTO: MATERIA OBSCURA
--  DATABASE: POSTGRESQL + POSTGIS (THE MEMORY OF EARTH)
-- ════════════════════════════════════════════════════════════════════════════

-- [ACT I: VOCATIO ELEMENTORUM]

CREATE SCHEMA IF NOT EXISTS Ordo;

-- ─── CANTUS PRIMUS: CHAOS ET ORDO ───────────────────────────────────────────

CREATE OR REPLACE FUNCTION Ordo.EntropyFilter_Purge(input_data TEXT) 
RETURNS VOID AS $$
BEGIN
    -- // Nihil ex nihilo fit.
    IF input_data IS NULL OR trim(input_data) = '' THEN
        -- // ...clamor erroris audietur!
        RAISE EXCEPTION 'ABYSSUS: Vacuitas non accipitur. (Error 0xBADC0DE)';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ─── CANTUS SECUNDUS: LEX AETERNA ───────────────────────────────────────────

CREATE OR REPLACE FUNCTION Ordo.Accuratio_SnapToGrid(geom GEOMETRY) 
RETURNS GEOMETRY AS $$
BEGIN
    -- // Quod imperfectum est, corrigetur.
    -- Использование точности 1e-6 (Limen) на уровне пространственной сетки
    RETURN ST_SnapToGrid(geom, 0.000001);
END;
$$ LANGUAGE plpgsql;

-- ─── CANTUS TERTIUS: MACHINATIO ─────────────────────────────────────────────

-- // Et verbum caro factum est.
-- Функция активации воли через запись в лог мироздания
CREATE TABLE IF NOT EXISTS Ordo.MateriaObscura (
    id SERIAL PRIMARY KEY,
    will TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION Ordo.VoidEngine_Invoke(intentio TEXT) 
RETURNS VOID AS $$
BEGIN
    INSERT INTO Ordo.MateriaObscura (will) VALUES ('Fiat: ' || intentio);
    RAISE NOTICE '[RUBIM] >>> Fiat: %', intentio;
END;
$$ LANGUAGE plpgsql;

-- ─── CANTUS QUARTUS: MAGISTER ───────────────────────────────────────────────

-- // В SQL Magister — это сама процедура, управляющая транзакцией
CREATE OR REPLACE PROCEDURE Ordo.Magister_DominariMateria(intentio TEXT)
AS $$
BEGIN
    -- // 1. INTROITUS 
    PERFORM Ordo.EntropyFilter_Purge(intentio);

    -- // 2. SILENTIUM 
    -- В SQL это уровень изоляции транзакции SERIALIZABLE (ImmutableLaw)
    -- LOCK TABLE Ordo.MateriaObscura IN EXCLUSIVE MODE;

    -- // 3. ACTIO 
    PERFORM Ordo.VoidEngine_Invoke(intentio);

    -- // 4. EXPLICIT 
    -- COMMIT происходит автоматически в конце процедуры.
END;
$$ LANGUAGE plpgsql;

-- ════════════════════════════════════════════════════════════════════════════
-- EXEMPLUM: CALL Ordo.Magister_DominariMateria('Fiat Lux');