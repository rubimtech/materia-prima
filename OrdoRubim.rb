# ════════════════════════════════════════════════════════════════════════════
#  ORDO RUBIM — SYMPHONIA CODICIS (RUBY VERSION)
#  LIBRETTO: MATERIA OBSCURA
#  INTERPRETATIO: MRI (Matz's Ruby Interpreter)
# ════════════════════════════════════════════════════════════════════════════

require 'singleton' # UNUS (Один)
require 'thread'    # FILUM (Нить)

# [ACT I: VOCATIO ELEMENTORUM]

# ─── CANTUS PRIMUS: CHAOS ET ORDO ────────────

module Chaos
  # // Hic sunt dracones.
  class RawInput
    attr_reader :data

    def initialize(data)
      # // Verbum congelatum est.
      @data = data.to_s.freeze 
    end

    # // Nihil ex nihilo fit.
    def void?
      @data.nil? || @data.strip.empty?
    end
  end

  module EntropyFilter
    module_function

    # // Purgamentum init, purgamentum exit.
    def purge(input)
      # // Si silentium est...
      if input.void?
        # // ...clamor erroris audietur!
        raise StandardError, "ABYSSUS: Vacuitas non accipitur."
      end
    end
  end
end

# ─── CANTUS SECUNDUS: LEX AETERNA ──────────────

module Dictatura
  module Accuratio
    module_function

    # // Mensura sine errore.
    def verify_purity(value)
      # // Numerus insanus vetatur.
      if value.nan? || value.infinite?
        raise RangeError, "HERESIS: Numerus non existit."
      end
    end

    # // Quod imperfectum est, corrigetur.
    def snap_to_grid(value)
      limen = 1e-6 
      return 0.0 if value.abs < limen
      value
    end
  end

  class ImmutableLaw
    # // Unus rex, una lex.
    @gate_keeper = Mutex.new

    def self.acquire_control
      # // Ianua clauditur.
      @gate_keeper.synchronize do
        # // Intra sanctum.
        yield
      end
      # // Ianua aperitur.
    end
  end
end

# ─── CANTUS TERTIUS: MACHINATIO ────────────────────

module MateriaObscura
  module VoidEngine
    module_function

    # // Et verbum caro factum est.
    def invoke(will)
      # // Machina obsequitur.
      puts "[RUBIM] >>> Fiat: #{will}"
    end
  end
end

# ─── CANTUS QUARTUS: MAGISTER ────────────────────

class Magister
  include Singleton

  # // Ego sum Alpha et Omega.

  # // In manu mea potestas est. 
  def dominari_materia(intentio)
    
    # // 1. INTROITUS (Вход)
    input = Chaos::RawInput.new(intentio)

    # // Si indignus es, discede. 
    Chaos::EntropyFilter.purge(input)

    # // 2. SILENTIUM 
    # // Tempus sistit. 
    Dictatura::ImmutableLaw.acquire_control do
      
      # // 3. ACTIO 
      # // Mundus mutatur. 
      MateriaObscura::VoidEngine.invoke(intentio)

    end # // 4. EXPLICIT (Mutex releases here)
  end
end

# ─── CANTUS QUINTUS: ADYTUM ────────────────────────

module Initiatus
  def self.included(base)
    # // Nomen est omen. (Имя есть знак.)
    unless base.const_defined?(:NOMEN_UMBRAE)
      raise NameError, "DAMNATIO: Classis #{base} sine nomine est."
    end
    
    nomen = base.const_get(:NOMEN_UMBRAE)
    if nomen.nil? || nomen.strip.empty?
       raise StandardError, "DAMNATIO: Nomen vacuum."
    end
  end

  # // Opus perfectum requiritur. 
  def opus_magnum(guru)
    raise NotImplementedError, "HERESIS: Opus Magnum non completum est."
  end
end

class Adytum
  def self.open_gates(adept_class)
    # // Nomina sunt odiosa? Non hic. 
    unless adept_class.include?(Initiatus)
      raise TypeError, "PROFANUS: Classis non initiata est."
    end

    nomen = adept_class.const_get(:NOMEN_UMBRAE)

    puts "\n>>> GLORIA IN EXCELSIS CODEX."
    puts ">>> Adventus: #{nomen}.\n\n"

    begin
      guru = Magister.instance
      neophyte = adept_class.new
      
      # // Incipit Tragoedia. 
      neophyte.opus_magnum(guru)
      
      puts "\n>>> CONSUMMATUM EST. (Свершилось.)"

    rescue => e
      # // Dies irae, dies illa. 
      STDERR.puts "\n!!! LACRIMOSA: #{e.message}"
      # Ruby way to exit with error code
      exit(0xDEAD) 
    end
  end
end

# ─── MACRO ACTIVATIONIS ────────────────────────────

def in_umbra_igitur_pugnabimus(adept_class)
  Adytum.open_gates(adept_class)
end

# ════════════════════════════════════════════════════════════════════════════
# EXEMPLUM
# ════════════════════════════════════════════════════════════════════════════

=begin

class Architectus
  include Initiatus
  
  NOMEN_UMBRAE = "Architect_Ruby"

  def opus_magnum(guru)
    guru.dominari_materia("Fiat Lux")
  end
end

in_umbra_igitur_pugnabimus(Architectus)

=end