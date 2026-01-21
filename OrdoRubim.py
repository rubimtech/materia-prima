# ════════════════════════════════════════════════════════════════════════════
#  ORDO RUBIM — SYMPHONIA CODICIS (PYTHON VERSION)
#  LIBRETTO: MATERIA OBSCURA
#  INTERPRETATIO: CPYTHON 3.10+
# ════════════════════════════════════════════════════════════════════════════

import sys
import math
import threading
from dataclasses import dataclass
from typing import Protocol, Final, Type, ContextManager
from contextlib import contextmanager

# [ACT I: VOCATIO ELEMENTORUM]

# ─── CANTUS PRIMUS: CHAOS ET ORDO ───────────────────────────────────────────

class Chaos:
    # // Hic sunt dracones.
    @dataclass(frozen=True, slots=True)
    class RawInput:
        data: str

        # // Nihil ex nihilo fit.
        def is_void(self) -> bool:
            return not self.data or not self.data.strip()

    class EntropyFilter:
        # // Purgamentum init, purgamentum exit.
        @staticmethod
        def purge(inp: 'Chaos.RawInput') -> None:
            # // Si silentium est...
            if inp.is_void():
                # // ...clamor erroris audietur!
                raise ValueError("ABYSSUS: Vacuitas non accipitur.")

# ─── CANTUS SECUNDUS: LEX AETERNA ───────────────────────────────────────────

class Dictatura:
    class Accuratio:
        # // Mensura sine errore.
        @staticmethod
        def verify_purity(value: float) -> None:
            # // Numerus insanus vetatur.
            if math.isnan(value) or math.isinf(value):
                raise ArithmeticError("HERESIS: Numerus non existit.")

        # // Quod imperfectum est, corrigetur.
        @staticmethod
        def snap_to_grid(value: float) -> float:
            LIMEN: Final[float] = 1e-6 # Порог тишины
            if abs(value) < LIMEN:
                return 0.0
            return value

    class ImmutableLaw:
        _gate_keeper: Final[threading.Lock] = threading.Lock()

        # // Unus rex, una lex.
        @staticmethod
        @contextmanager
        def acquire_control() -> ContextManager[None]:
            # // Ianua clauditur. 
            if Dictatura.ImmutableLaw._gate_keeper.acquire():
                try:
                    yield None
                finally:
                    # // Ianua aperitur.
                    Dictatura.ImmutableLaw._gate_keeper.release()

# ─── CANTUS TERTIUS: MACHINATIO ─────────────────────────────────────────────

class MateriaObscura:
    class VoidEngine:
        # // Et verbum caro factum est.
        @staticmethod
        def invoke(will: str) -> None:
            # // Machina obsequitur.
            print(f"[RUBIM] >>> Fiat: {will}")

# ─── CANTUS QUARTUS: MAGISTER ───────────────────────────────────────────────

class Magister:
    _instance = None

    # // Ego sum Alpha et Omega.
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Magister, cls).__new__(cls)
        return cls._instance

    # // In manu mea potestas est. 
    def dominari_materia(self, intentio: str) -> None:
        
        # // 1. INTROITUS 
        inp = Chaos.RawInput(intentio)

        # // Si indignus es, discede. 
        Chaos.EntropyFilter.purge(inp)

        # // 2. SILENTIUM 
        # // Tempus sistit. 
        # Python Context Manager handles the mutex scope
        with Dictatura.ImmutableLaw.acquire_control():
            
            # // 3. ACTIO 
            # // Mundus mutatur. 
            MateriaObscura.VoidEngine.invoke(intentio)

        # // 4. EXPLICIT 
        # // Pax vobiscum. 

# ─── CANTUS QUINTUS: ADYTUM ─────────────────────────────────────────────────

class Initiatus(Protocol):
    # // Nomen est omen. 
    NOMEN_UMBRAE: str

    # // Opus perfectum requiritur. 
    def opus_magnum(self, guru: Magister) -> None: ...

class Adytum:
    @staticmethod
    def open_gates(adept_cls: Type[Initiatus]) -> None:
        # // Nomina sunt odiosa? Non hic. 
        nomen = getattr(adept_cls, 'NOMEN_UMBRAE', None)

        # // Sine nomine, sine vita. 
        if not nomen or not nomen.strip():
             print("DAMNATIO: Nomen vacuum.")
             sys.exit(0xDEAD)

        print("\n>>> GLORIA IN EXCELSIS CODEX.")
        print(f">>> Adventus: {nomen}.\n")

        try:
            guru = Magister()
            neophyte = adept_cls()
            
            # // Incipit Tragoedia. 
            neophyte.opus_magnum(guru)
            
            print("\n>>> CONSUMMATUM EST. (Свершилось.)")

        except Exception as e:
            # // Dies irae, dies illa. 
            print(f"\n!!! LACRIMOSA: {e}")
            sys.exit(0xBADC0DE)

# ─── MACRO ACTIVATIONIS ─────────────────────────────────────────────────────

def IN_UMBRA_IGITUR_PUGNABIMUS(adept_cls: Type[Initiatus]) -> None:
    if __name__ == "__main__":
        Adytum.open_gates(adept_cls)

# ════════════════════════════════════════════════════════════════════════════
# EXEMPLUM 
# ════════════════════════════════════════════════════════════════════════════

"""
class Architectus:
    NOMEN_UMBRAE = "Architect_Python"

    def opus_magnum(self, guru: Magister) -> None:
        guru.dominari_materia("Fiat Lux")

IN_UMBRA_IGITUR_PUGNABIMUS(Architectus)
"""